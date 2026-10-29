package com.chickendelivery.service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.Set;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.chickendelivery.dto.ProductResponse;
import com.chickendelivery.entity.Product;
import com.chickendelivery.repository.ProductRepository;

@Service
@Transactional
public class ProductService {

private final ProductRepository productRepository;
private final FileStorageService fileStorageService;

private static final Set<String> ALLOWED_CATEGORIES = Set.of(
        "Vegetables",
        "Fruits",
        "Pulses",
        "Cereals & Grains",
        "Daily Essentials",
        "Spices & Masalas",
        "Dry Fruits"
);

public ProductService(
        ProductRepository productRepository,
        FileStorageService fileStorageService) {
    this.productRepository = productRepository;
    this.fileStorageService = fileStorageService;
}

public ProductResponse createProduct(
        String name,
        String description,
        BigDecimal price,
        String weight,
        String sellingUnit,
        String category,
        Boolean active,
        MultipartFile image) {

    validateProduct(name, price, weight, sellingUnit, category);

    Product product = new Product();
    product.setName(name.trim());
    product.setDescription(
            description == null ? null : description.trim()
    );
    product.setPrice(price.setScale(2, RoundingMode.HALF_UP));
    product.setWeight(weight.trim());
    product.setSellingUnit(normalizeSellingUnit(sellingUnit));
    product.setCategory(normalizeCategory(category));
    product.setActive(active != null ? active : true);

    if (image != null && !image.isEmpty()) {
        product.setImageUrl(
                fileStorageService.storeProductImage(image)
        );
    }

    return new ProductResponse(productRepository.save(product));
}

@Transactional(readOnly = true)
public List<ProductResponse> getAllProducts() {
    return productRepository.findAll()
            .stream()
            .map(ProductResponse::new)
            .toList();
}

@Transactional(readOnly = true)
public List<ProductResponse> getActiveProducts() {
    return productRepository.findByActiveTrueOrderByIdDesc()
            .stream()
            .map(ProductResponse::new)
            .toList();
}

@Transactional(readOnly = true)
public ProductResponse getProductById(Long id) {
    Product product = productRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException(
                    "Product not found with id: " + id
            ));

    return new ProductResponse(product);
}

public ProductResponse updateProduct(
        Long id,
        String name,
        String description,
        BigDecimal price,
        String weight,
        String sellingUnit,
        String category,
        Boolean active,
        MultipartFile image) {

    validateProduct(name, price, weight, sellingUnit, category);

    Product product = productRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException(
                    "Product not found with id: " + id
            ));

    product.setName(name.trim());
    product.setDescription(
            description == null ? null : description.trim()
    );
    product.setPrice(price.setScale(2, RoundingMode.HALF_UP));
    product.setWeight(weight.trim());
    product.setSellingUnit(normalizeSellingUnit(sellingUnit));
    product.setCategory(normalizeCategory(category));

    if (active != null) {
        product.setActive(active);
    }

    if (image != null && !image.isEmpty()) {
        String oldImageUrl = product.getImageUrl();
        String newImageUrl = fileStorageService.storeProductImage(image);

        product.setImageUrl(newImageUrl);

        if (oldImageUrl != null && !oldImageUrl.isBlank()) {
            fileStorageService.deleteProductImage(oldImageUrl);
        }
    }

    return new ProductResponse(productRepository.save(product));
}

public void deleteProduct(Long id) {
    Product product = productRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException(
                    "Product not found with id: " + id
            ));

    String imageUrl = product.getImageUrl();
    productRepository.delete(product);

    if (imageUrl != null && !imageUrl.isBlank()) {
        fileStorageService.deleteProductImage(imageUrl);
    }
}

private void validateProduct(
        String name,
        BigDecimal price,
        String weight,
        String sellingUnit,
        String category) {

    if (name == null || name.isBlank()) {
        throw new IllegalArgumentException("Product name is required.");
    }

    if (price == null || price.compareTo(BigDecimal.ZERO) <= 0) {
        throw new IllegalArgumentException(
                "Product price must be greater than 0."
        );
    }

    if (weight == null || weight.isBlank()) {
        throw new IllegalArgumentException("Product weight is required.");
    }

    normalizeSellingUnit(sellingUnit);
    normalizeCategory(category);
}

private String normalizeSellingUnit(String sellingUnit) {
    if (sellingUnit == null || sellingUnit.isBlank()) {
        throw new IllegalArgumentException("Selling unit is required.");
    }

    String unit = sellingUnit.trim().toUpperCase();

    if (!unit.equals("KG") && !unit.equals("PIECE")) {
        throw new IllegalArgumentException(
                "Selling unit must be KG or PIECE."
        );
    }

    return unit;
}

private String normalizeCategory(String category) {
    if (category == null || category.isBlank()) {
        throw new IllegalArgumentException("Product category is required.");
    }

    String input = category.trim();

    return ALLOWED_CATEGORIES.stream()
            .filter(value -> value.equalsIgnoreCase(input))
            .findFirst()
            .orElseThrow(() -> new IllegalArgumentException(
                    "Invalid category. Choose one of: "
                            + String.join(", ", ALLOWED_CATEGORIES)
            ));
}

}