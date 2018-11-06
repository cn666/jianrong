package com.jointsky.automonitor.enforcementquery.entity;
/**
 * 
    * @ClassName: ParamEntity  
    * @Description: TODO(查询条件实体类)  
    * @author Administrator  
    * @date 2018年5月29日  
    *
 */
public class ParamEntity {
	private String psId;
	private String mpId;
	private String search_mpId;
	private String search_dataType;//数据类型  1  日数据  2 小时数据
	private String search_revisType;//修约类型  0 修约前  1  修约后
	private String search_startEndTimeParm;
	private String mpTypeCode;
	
	public String getPsId() {
		return psId;
	}
	public void setPsId(String psId) {
		this.psId = psId;
	}
	public String getSearch_mpId() {
		return search_mpId;
	}
	public void setSearch_mpId(String search_mpId) {
		this.search_mpId = search_mpId;
	}
	
	public String getSearch_dataType() {
		return search_dataType;
	}
	public void setSearch_dataType(String search_dataType) {
		this.search_dataType = search_dataType;
	}
	public String getSearch_revisType() {
		return search_revisType;
	}
	public void setSearch_revisType(String search_revisType) {
		this.search_revisType = search_revisType;
	}
	public String getSearch_startEndTimeParm() {
		return search_startEndTimeParm;
	}
	public void setSearch_startEndTimeParm(String search_startEndTimeParm) {
		this.search_startEndTimeParm = search_startEndTimeParm;
	}
	public String getMpTypeCode() {
		return mpTypeCode;
	}
	public void setMpTypeCode(String mpTypeCode) {
		this.mpTypeCode = mpTypeCode;
	}
	public String getMpId() {
		return mpId;
	}
	public void setMpId(String mpId) {
		this.mpId = mpId;
	}
	
	
	
	
	
}
