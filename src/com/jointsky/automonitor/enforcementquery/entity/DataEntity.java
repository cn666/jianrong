package com.jointsky.automonitor.enforcementquery.entity;

public class DataEntity {
	private String psCode;
	private String mpCode;
	//监测时间
	private String monitorTime;
	//污染物编号
	private String pollutantCode;
	//污染物名称
	private String pollutantName;
	//污染物单位
	private String pollutantUnit;
	//原始流量
	private String flow;
	//修正流量
	private String revisedFlow;
	//原始浓度
	private String avgStrength;
	//折算浓度
	private String zsAvgStrength;
	//修正浓度
	private String revisedStrength;
	//修正折算浓度
	private String revisedZsStrength;
	//氧含量
	private String so1;
	//排放标准
	private String standardValue;
	public String getPsCode() {
		return psCode;
	}
	public void setPsCode(String psCode) {
		this.psCode = psCode;
	}
	public String getMpCode() {
		return mpCode;
	}
	public void setMpCode(String mpCode) {
		this.mpCode = mpCode;
	}
	public String getMonitorTime() {
		return monitorTime;
	}
	public void setMonitorTime(String monitorTime) {
		this.monitorTime = monitorTime;
	}
	public String getPollutantCode() {
		return pollutantCode;
	}
	public void setPollutantCode(String pollutantCode) {
		this.pollutantCode = pollutantCode;
	}
	public String getPollutantName() {
		return pollutantName;
	}
	public void setPollutantName(String pollutantName) {
		this.pollutantName = pollutantName;
	}
	public String getPollutantUnit() {
		return pollutantUnit;
	}
	public void setPollutantUnit(String pollutantUnit) {
		this.pollutantUnit = pollutantUnit;
	}
	public String getFlow() {
		return flow;
	}
	public void setFlow(String flow) {
		this.flow = flow;
	}
	public String getRevisedFlow() {
		return revisedFlow;
	}
	public void setRevisedFlow(String revisedFlow) {
		this.revisedFlow = revisedFlow;
	}
	public String getAvgStrength() {
		return avgStrength;
	}
	public void setAvgStrength(String avgStrength) {
		this.avgStrength = avgStrength;
	}
	public String getZsAvgStrength() {
		return zsAvgStrength;
	}
	public void setZsAvgStrength(String zsAvgStrength) {
		this.zsAvgStrength = zsAvgStrength;
	}
	public String getRevisedStrength() {
		return revisedStrength;
	}
	public void setRevisedStrength(String revisedStrength) {
		this.revisedStrength = revisedStrength;
	}
	public String getRevisedZsStrength() {
		return revisedZsStrength;
	}
	public void setRevisedZsStrength(String revisedZsStrength) {
		this.revisedZsStrength = revisedZsStrength;
	}
	public String getSo1() {
		return so1;
	}
	public void setSo1(String so1) {
		this.so1 = so1;
	}
	public String getStandardValue() {
		return standardValue;
	}
	public void setStandardValue(String standardValue) {
		this.standardValue = standardValue;
	}
	
	
}
