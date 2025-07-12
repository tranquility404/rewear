package com.tranquility.ReWear.repository;

import com.tranquility.ReWear.model.Item;
import com.tranquility.ReWear.model.ItemStatus;
import com.tranquility.ReWear.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends MongoRepository<Item, String> {
    List<Item> findByStatusOrderByCreatedAtDesc(ItemStatus status, Pageable pageable);
    List<Item> findByUploaderAndStatus(User uploader, ItemStatus status);
    List<Item> findByUploader(User uploader);
    Page<Item> findByStatus(ItemStatus status, Pageable pageable);
    List<Item> findByStatus(ItemStatus status);
}
