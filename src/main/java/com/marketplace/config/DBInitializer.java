package com.marketplace.config;

import com.marketplace.entities.Category;
import com.marketplace.entities.Product;
import com.marketplace.entities.SubCategory;
import com.marketplace.entities.User;
import com.marketplace.repositories.CategoryRepository;
import com.marketplace.repositories.ProductRepository;
import com.marketplace.repositories.SubCategoryRepository;
import com.marketplace.repositories.UserRepository;
import lombok.var;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

@Component
public class DBInitializer implements ApplicationRunner {

    private CategoryRepository categoryRepository;
    private SubCategoryRepository subCategoryRepository;
    private ProductRepository productRepository;
    private UserRepository userRepository;

    public DBInitializer(CategoryRepository categoryRepository,
                         SubCategoryRepository subCategoryRepository,
                         ProductRepository productRepository,
                         UserRepository userRepository) {
        this.categoryRepository = categoryRepository;
        this.subCategoryRepository = subCategoryRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        initializeDb();
    }

    private void initializeDb() throws IOException {

        var alexUser = newUser("alexto", "Alex", "To",
                "https://scontent.fcbr1-1.fna.fbcdn.net/v/t1.0-9/13925012_10210467995760593_2695768106647215842_n.jpg?_nc_cat=108&_nc_sid=85a577&_nc_oc=AQnQHXLBlma6OAdxUs6Mk7MWg4QIXT574ZPjo8rCwaKjxlyDeb5ueUFlj88m1ipyW7M&_nc_ht=scontent.fcbr1-1.fna&oh=7aa4bff90313325be4955e8610ee1596&oe=5EA58FF9",
                "Software Engineer", "123");

        var trinhUser = newUser("trinhnguyen", "Thuy Trinh", "Nguyen",
                "https://scontent.fcbr1-1.fna.fbcdn.net/v/t1.0-9/69759729_2587043344660910_4685389306494189568_o.jpg?_nc_cat=106&_nc_sid=7aed08&_nc_oc=AQnENH0RNRcjkEGHrTcv-Yb8Wjh2JOIaK2ethLsC2Qeej37VsHTUJlze0fc3AoI7Onk&_nc_ht=scontent.fcbr1-1.fna&oh=c3a15549dd10d894cdcb022be6f01bc3&oe=5EA7511C",
                "Full Stack Developer", "123");

        var charmaineUser = newUser("charmainenguyen", "Charmaine", "Nguyen",
                "https://scontent.fcbr1-1.fna.fbcdn.net/v/t1.0-9/86970421_2959197130778861_5922067530981048320_o.jpg?_nc_cat=109&_nc_sid=85a577&_nc_oc=AQn8On7kBZ-nAKOi9lBTluSNh3JZCtEUDrtHv47xGcaXksATzxFTzy8JnLR-Vx_B9G4&_nc_ht=scontent.fcbr1-1.fna&oh=f028f26a3f7b938efa113eaa5f9bcb2c&oe=5EA755B0",
                "Frontend Developer", "123");

        var accessoriesCat = newCategory("Accessories", alexUser.getUsername());
        var laptopsCat = newCategory("Laptops", alexUser.getUsername());
        var printerCat = newCategory("Printers", alexUser.getUsername());

        var keyboardSub = newSubCategory(accessoriesCat, "Keyboard", trinhUser.getUsername());
        var monitorSub = newSubCategory(accessoriesCat, "Monitor", trinhUser.getUsername());
        var mouseSub = newSubCategory(accessoriesCat, "Mouse", trinhUser.getUsername());

        var laptopSub = newSubCategory(laptopsCat, "Laptop", trinhUser.getUsername());
        var chromebookSub = newSubCategory(laptopsCat, "Chromebook", trinhUser.getUsername());

        var printerMachineSub = newSubCategory(printerCat, "Printer Machine", trinhUser.getUsername());
        var inkSub = newSubCategory(printerCat, "Ink", trinhUser.getUsername());
        var tonerSub = newSubCategory(printerCat, "Toner", trinhUser.getUsername());

        FileInputStream file = new FileInputStream(new File("data/products.xlsx"));
        Workbook workbook = new XSSFWorkbook(file);
        Sheet sheet = workbook.getSheetAt(0);

        try {
            for (Row row : sheet) {
                var name = row.getCell(0).getStringCellValue().trim();
                var price = row.getCell(1).getNumericCellValue();
                var desc = row.getCell(2).getStringCellValue();
                var image = row.getCell(3).getStringCellValue().trim();
                var subCatName = row.getCell(4).getStringCellValue().trim();
                var subCat = subCategoryRepository.findByName(subCatName).get();

                String username = alexUser.getUsername();

                switch (row.getRowNum() % 3) {
                    case 0:
                        username = trinhUser.getUsername();
                        break;
                    case 1:
                        username = charmaineUser.getUsername();
                        break;
                    case 2:
                        username = alexUser.getUsername();
                }

                newProduct(subCat, name, price, desc, image, username);
            }
        } finally {
            workbook.close();
        }
    }


    private User newUser(String username, String firstName, String lastName,
                         String profilePicture, String title, String password) {
        return userRepository.findByUsername(username).orElseGet(() -> {
            var user = new User();
            user.setUsername(username);
            user.setFirstName(firstName);
            user.setLastName(lastName);
            user.setProfilePicture(profilePicture);
            user.setTitle(title);
            user.setPassword(password);
            return userRepository.save(user);
        });
    }

    private Category newCategory(String name, String username) {
        return categoryRepository.findByName(name).orElseGet(() -> {
            var category = new Category();
            category.setName(name);
            category.setCreatedBy(username);
            return categoryRepository.save(category);
        });
    }

    private SubCategory newSubCategory(Category category, String name, String username) {
        return subCategoryRepository.findByName(name).orElseGet(() -> {
            var subCategory = new SubCategory();
            subCategory.setCategory(category);
            subCategory.setName(name);
            subCategory.setCreatedBy(username);
            return subCategoryRepository.save(subCategory);
        });
    }

    private void newProduct(SubCategory subCategory, String name, Double price, String description, String image, String username) {
        if (productRepository.existsByName(name)) {
            return;
        }

        var product = new Product();
        product.setName(name);
        product.setPrice(price);
        product.setDescription(description);
        product.setImage(image);
        product.setSubCategory(subCategory);
        product.setCreatedBy(username);
        productRepository.save(product);

    }

}
