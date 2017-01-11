package com.foodStore.service;

import java.util.List;

import com.foodStore.model.ImageRepo;

public interface IImageService {
	ImageRepo createImage(String code, byte[] image);
	boolean deleteImage(int imageId);
	ImageRepo updateImage(int imageId, byte[] newImage);
	List<ImageRepo> getImageByCode(String code);
}
