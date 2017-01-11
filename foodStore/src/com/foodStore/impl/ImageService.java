package com.foodStore.impl;

import java.util.List;
import java.util.UUID;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;

import com.foodStore.hibernate.HibernateRepository.ICriteriaBuilder;
import com.foodStore.hibernate.IRepository;
import com.foodStore.model.ImageRepo;
import com.foodStore.service.IImageService;

public class ImageService extends ServiceBase<ImageRepo> implements IImageService{

	public ImageService(IRepository repository) {
		super(repository);
	}

	@Override
	public ImageRepo createImage(String code, byte[] imageData) {
		if (code == null) code = UUID.randomUUID().toString();
		ImageRepo image = new ImageRepo();
		image.setImageCode(code);
		image.setImageByte(imageData);
		return save(image);
	}

	@Override
	public boolean deleteImage(int imageId) {
		ImageRepo image = this.repository.getItemById(ImageRepo.class, imageId);
		if (image != null) return this.repository.deleteItem(image);
		return false;
	}

	@Override
	public ImageRepo updateImage(int imageId, byte[] newImage) {
		ImageRepo image = this.repository.getItemById(ImageRepo.class, imageId);
		if (image == null) return null;
		image.setImageByte(newImage);
		if (this.repository.updateItem(image)){
			return image;
		}
		return null;
	}

	@Override
	public List<ImageRepo> getImageByCode(String code) {
		List<ImageRepo> images = this.repository.customQuery(ImageRepo.class, new ICriteriaBuilder(){
			@Override
			public Criteria build(Session session) {
				Criteria criteria = session.createCriteria(ImageRepo.class);
				criteria.add(Restrictions.eq("imageCode", code));
				return criteria;
			}
		});
		return images;
	}

}
