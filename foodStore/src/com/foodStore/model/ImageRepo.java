package com.foodStore.model;

public class ImageRepo extends BaseModelObject{
	private String imageCode;
	private byte[] imageByte;
	public String getImageCode() {
		return imageCode;
	}
	public void setImageCode(String imageCode) {
		this.imageCode = imageCode;
	}
	public byte[] getImageByte() {
		return imageByte;
	}
	public void setImageByte(byte[] imageByte) {
		this.imageByte = imageByte;
	}
}
