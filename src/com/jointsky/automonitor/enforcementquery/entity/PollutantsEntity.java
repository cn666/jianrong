package com.jointsky.automonitor.enforcementquery.entity;

public class PollutantsEntity {
	
	/**
	 * 污染物代码
	 */
	private String pollCode;
	
	/**
	 * 污染物名称
	 */
	private String pollName;
	
	/**
	 * 污染物类型
	 */
	private String pollType;
	/**
	 * 污染物单位
	 */
	private String unit;
	public String getPollCode() {
		return pollCode;
	}
	public void setPollCode(String pollCode) {
		this.pollCode = pollCode;
	}
	public String getPollName() {
		return pollName;
	}
	public void setPollName(String pollName) {
		this.pollName = pollName;
	}
	public String getPollType() {
		return pollType;
	}
	public void setPollType(String pollType) {
		this.pollType = pollType;
	}
	public String getUnit() {
		return unit;
	}
	public void setUnit(String unit) {
		this.unit = unit;
	}
	
	
	
}
