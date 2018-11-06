package com.jointsky.automonitor.enforcementquery.action;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.apache.struts2.ServletActionContext;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.jointsky.automonitor.enforcementquery.entity.DataEntity;
import com.jointsky.automonitor.enforcementquery.entity.ParamEntity;
import com.jointsky.automonitor.enforcementquery.manager.EnforcementQueryService;
import com.jointsky.automonitor.enforcementquery.manager.impl.EnforcementQueryServiceImpl;
import com.opensymphony.xwork2.ActionSupport;
import com.opensymphony.xwork2.ModelDriven;
/**
 * 
    * @ClassName: EnforcementQueryAction  
    * @Description: TODO(四川移动执法查询国控数据Action)  
    * @author Administrator  
    * @date 2018年5月29日  
    *
 */
public class EnforcementQueryAction extends ActionSupport implements ModelDriven<ParamEntity>{

	  
	    /**  
	    * @Fields field:field:{todo}(用一句话描述这个变量表示什么)  
	    */  
	    
	private static final long serialVersionUID = 2665642804205230248L;
	
	private EnforcementQueryService enforcementQueryService =EnforcementQueryServiceImpl.getInstance();
	/**
	 * 用户的regionCode
	 */
	private String userRegionCode;
	/***
	 * 返回值
	 */
	private Object result;
	/**
	 * 模糊查询关键字
	 */
	private String keyName;
	/**
	 * 污染源ID
	 */
	private String psId;
	/**
	 * 
	 */
	private String regionCode;
	
	private Integer pageNo;
	
	private Integer pageSize;
	/**
	 * 参数实体
	 */
	private ParamEntity paramEntity=new ParamEntity();

	@Override
	public ParamEntity getModel() {
		return paramEntity;
	}
	/**
	 * 
	 * <p>Title: searchList</p>  
	 * <p>Description:跳转页面,获取访问者传入的regionCode </p>  
	 * @return
	 */
	public String searchList(){
		if(StringUtils.isNotBlank(userRegionCode)){
			ServletActionContext.getRequest().getSession().setAttribute("userRegionCode", userRegionCode);
			return "list";
		}else{
			return null;
		}
		
	}
	/**
	 * 
	 * <p>Title: getDataUserRegionCode</p>  
	 * <p>Description: 获取请求用户的regionCode 传递给页面</p>  
	 * @return
	 */
	public String getDataUserRegionCode(){
		String regionCode = (String) ServletActionContext.getRequest().getSession().getAttribute("userRegionCode");
		JSONObject json = new JSONObject();
		
		json.put("userRegionCode", regionCode);
			
		result = json;
		
		
		return SUCCESS;
	}
	/**
	 * 
	 * <p>Title: jsonList</p>  
	 * <p>Description: 查询符合条件的所有数据 </p>  
	 * @return
	 */
	public String jsonList(){
		String mpType = paramEntity.getMpTypeCode();// 4水 5气 6 进水
		String revisType =paramEntity.getSearch_revisType(); //0修约前  1 修约后
		String dataType = paramEntity.getSearch_dataType();//1 日  2  小时
		
		List<DataEntity> list = enforcementQueryService.findList(paramEntity);
		JSONArray jsonArray = new JSONArray();//rows
		JSONArray titleArray1 = new JSONArray();//title
		JSONArray titleArray2 = new JSONArray();//title
		if(list!=null && list.size()>0){
			// 对查询结果进行分组
			LinkedHashMap<String, List<DataEntity>> map = new LinkedHashMap<String, List<DataEntity>>(); 
			for (int i = 0; i < list.size(); i++) {
				DataEntity entity = list.get(i);
				if (map.containsKey(entity.getMonitorTime())) { // 如果已经存在这个数组，就放在这里
					List<DataEntity> revList = map.get(entity.getMonitorTime());
					revList.add(entity);
				} else {
					List<DataEntity> revList = new ArrayList<DataEntity>(); // 重新声明一个数组list
					revList.add(entity);
					map.put(entity.getMonitorTime(), revList);
				}
			}
			
			//遍历map 结果封装数据(优化后代码量大 但是循环里的判断计算减少  运行速度提高)
			for (Map.Entry<String, List<DataEntity>> mapObj : map.entrySet()) {
				
				
				String key =mapObj.getKey();
				List<DataEntity> entityList =mapObj.getValue();
				
				if(mpType.equals("5")){ //气
					
					
					//column
					JSONObject jsonTitle = new JSONObject();//封装表头
					jsonTitle.put("field", "so1");
					jsonTitle.put("title", "氧含量(百分比)");
					jsonTitle.put("rowspan", 2);
					jsonTitle.put("colspan", 0);
					if(!titleArray1.contains(jsonTitle)){//不存在则添加
						titleArray1.add(jsonTitle);
					}
					
					if(revisType.equals("0")){//修约前
						JSONObject json = new JSONObject();//封装数据json
						if(dataType.equals("1")){ //日数据
							json.put("monitorTime", key.substring(0, 11));
						}else{
							json.put("monitorTime", key.substring(0, 19));
						}
						
						json.put("so1", entityList.get(0).getSo1());
						
						json.put("folw", entityList.get(0).getFlow());
						
						//column
						JSONObject jsonTitle2 = new JSONObject();//封装表头
						jsonTitle2.put("field", "folw");
						jsonTitle2.put("rowspan", 2);
						jsonTitle2.put("colspan", 0);
						jsonTitle2.put("title", "废气监控点排放量(立方米)");
						if(!titleArray1.contains(jsonTitle2)){//不存在则添加
							titleArray1.add(jsonTitle2);
						}
						
						for ( int i=0;i<entityList.size();i++) {
							DataEntity dataEntity = entityList.get(i);
							
							JSONObject jsonTitle1 = new JSONObject();//封装表头
							jsonTitle1.put("field","");
							jsonTitle1.put("title", dataEntity.getPollutantName()+"("+dataEntity.getPollutantUnit()+")");
							jsonTitle1.put("colspan", 3);
							jsonTitle1.put("rowspan", 0);
							if(!titleArray1.contains(jsonTitle1)){//不存在则添加
								titleArray1.add(jsonTitle1);
							}
							
							JSONObject jsonTitle21 = new JSONObject();//封装表头
							jsonTitle21.put("field", "avgStrength"+dataEntity.getPollutantCode());
							jsonTitle21.put("title", "原始浓度");
							if(!titleArray2.contains(jsonTitle21)){//不存在则添加
								titleArray2.add(jsonTitle21);
							}
							JSONObject jsonTitle22 = new JSONObject();//封装表头
							jsonTitle22.put("field","zsAvgStrength"+dataEntity.getPollutantCode());
							jsonTitle22.put("title", "折算浓度");
							if(!titleArray2.contains(jsonTitle22)){//不存在则添加
								titleArray2.add(jsonTitle22);
							}
							JSONObject jsonTitle23 = new JSONObject();//封装表头
							jsonTitle23.put("field", "standardValue"+dataEntity.getPollutantCode());
							jsonTitle23.put("title", "排放标准");
							if(!titleArray2.contains(jsonTitle23)){//不存在则添加
								titleArray2.add(jsonTitle23);
							}
							
							json.put("avgStrength"+dataEntity.getPollutantCode(),dataEntity.getAvgStrength());
							json.put("zsAvgStrength"+dataEntity.getPollutantCode(),dataEntity.getZsAvgStrength());
							json.put("standardValue"+dataEntity.getPollutantCode(),dataEntity.getStandardValue());
							
							
						}
						jsonArray.add(json);
						
						
					}else if(revisType.equals("1")){//修约后
						JSONObject json = new JSONObject();//封装数据json
						json.put("so1", entityList.get(0).getSo1());
						
						if(dataType.equals("1")){ //日数据
							json.put("monitorTime", key.substring(0, 11));
						}else{
							json.put("monitorTime", key.substring(0, 19));
						}
						json.put("revisedFlow", entityList.get(0).getRevisedFlow());
						//column
						JSONObject jsonTitle2 = new JSONObject();//封装表头
						jsonTitle2.put("field", "revisedFlow");
						jsonTitle2.put("colspan", 0);
						jsonTitle2.put("rowspan", 2);
						jsonTitle2.put("title", "废气监控点修正排放量(立方米)");
						if(!titleArray1.contains(jsonTitle2)){//不存在则添加
							titleArray1.add(jsonTitle2);
						}
						for ( int i=0;i<entityList.size();i++) {
							DataEntity dataEntity = entityList.get(i);
							
							JSONObject jsonTitle1 = new JSONObject();//封装表头
							jsonTitle1.put("field", "");
							jsonTitle1.put("title", dataEntity.getPollutantName()+"("+dataEntity.getPollutantUnit()+")");
							jsonTitle1.put("colspan", 3);
							jsonTitle1.put("rowspan", 0);
							if(!titleArray1.contains(jsonTitle1)){//不存在则添加
								titleArray1.add(jsonTitle1);
							}
							
							JSONObject jsonTitle21 = new JSONObject();//封装表头
							jsonTitle21.put("field", "revisedStrength"+dataEntity.getPollutantCode());
							jsonTitle21.put("title", "修正浓度");
							if(!titleArray2.contains(jsonTitle21)){//不存在则添加
								titleArray2.add(jsonTitle21);
							}
							JSONObject jsonTitle22 = new JSONObject();//封装表头
							jsonTitle22.put("field","revisedZsStrength"+dataEntity.getPollutantCode());
							jsonTitle22.put("title", "修正折算浓度");
							if(!titleArray2.contains(jsonTitle22)){//不存在则添加
								titleArray2.add(jsonTitle22);
							}
							JSONObject jsonTitle23 = new JSONObject();//封装表头
							jsonTitle23.put("field", "standardValue"+dataEntity.getPollutantCode());
							jsonTitle23.put("title", "排放标准");
							if(!titleArray2.contains(jsonTitle23)){//不存在则添加
								titleArray2.add(jsonTitle23);
							}
							
							json.put("revisedStrength"+dataEntity.getPollutantCode(),dataEntity.getRevisedStrength());
							json.put("revisedZsStrength"+dataEntity.getPollutantCode(),dataEntity.getRevisedZsStrength());
							json.put("standardValue"+dataEntity.getPollutantCode(),dataEntity.getStandardValue());
							
						}
						jsonArray.add(json);
					}
					
					
				}else{//水
					if(revisType.equals("0")){//修约前
						JSONObject json = new JSONObject();//封装数据json
						if(dataType.equals("1")){ //日数据
							json.put("monitorTime", key.substring(0, 11));
						}else{
							json.put("monitorTime", key.substring(0, 19));
						}
						json.put("folw", entityList.get(0).getFlow());
						//column
						JSONObject jsonTitle2 = new JSONObject();//封装表头
						jsonTitle2.put("field", "folw");
						jsonTitle2.put("rowspan", 2);
						jsonTitle2.put("colspan", 0);
						jsonTitle2.put("title", "废水监控点排放量(吨)");
						if(!titleArray1.contains(jsonTitle2)){//不存在则添加
							titleArray1.add(jsonTitle2);
						}
						
						for ( int i=0;i<entityList.size();i++) {
							DataEntity dataEntity = entityList.get(i);
							
							JSONObject jsonTitle1 = new JSONObject();//封装表头
							jsonTitle1.put("field", "");
							jsonTitle1.put("title", dataEntity.getPollutantName()+"("+dataEntity.getPollutantUnit()+")");
							jsonTitle1.put("colspan", 2);
							jsonTitle1.put("rowspan", 0);
							if(!titleArray1.contains(jsonTitle1)){//不存在则添加
								titleArray1.add(jsonTitle1);
							}
							
							JSONObject jsonTitle21 = new JSONObject();//封装表头
							jsonTitle21.put("field", "avgStrength"+dataEntity.getPollutantCode());
							jsonTitle21.put("title", "原始浓度");
							if(!titleArray2.contains(jsonTitle21)){//不存在则添加
								titleArray2.add(jsonTitle21);
							}
							JSONObject jsonTitle23 = new JSONObject();//封装表头
							jsonTitle23.put("field", "standardValue"+dataEntity.getPollutantCode());
							jsonTitle23.put("title", "排放标准");
							if(!titleArray2.contains(jsonTitle23)){//不存在则添加
								titleArray2.add(jsonTitle23);
							}
							
							
							json.put("avgStrength"+dataEntity.getPollutantCode(),dataEntity.getAvgStrength());
							json.put("standardValue"+dataEntity.getPollutantCode(),dataEntity.getStandardValue());
							
						}
						
						jsonArray.add(json);
					}else if(revisType.equals("1")){//修约后
						JSONObject json = new JSONObject();//封装数据json
						if(dataType.equals("1")){ //日数据
							json.put("monitorTime", key.substring(0, 11));
						}else{
							json.put("monitorTime", key.substring(0, 19));
						}
						json.put("revisedFlow", entityList.get(0).getRevisedFlow());
						//column
						JSONObject jsonTitle2 = new JSONObject();//封装表头
						jsonTitle2.put("field", "revisedFlow");
						jsonTitle2.put("rowspan", 2);
						jsonTitle2.put("colspan", 0);
						jsonTitle2.put("title", "废水监控点修正排放量(吨)");
						if(!titleArray1.contains(jsonTitle2)){//不存在则添加
							titleArray1.add(jsonTitle2);
						}
						
						for ( int i=0;i<entityList.size();i++) {
							DataEntity dataEntity = entityList.get(i);
							
							JSONObject jsonTitle1 = new JSONObject();//封装表头
							jsonTitle1.put("field", "");
							jsonTitle1.put("title", dataEntity.getPollutantName()+"("+dataEntity.getPollutantUnit()+")");
							jsonTitle1.put("colspan", 2);
							jsonTitle1.put("rowspan", 0);
							if(!titleArray1.contains(jsonTitle1)){//不存在则添加
								titleArray1.add(jsonTitle1);
							}
							
							JSONObject jsonTitle21 = new JSONObject();//封装表头
							jsonTitle21.put("field", "revisedStrength"+dataEntity.getPollutantCode());
							jsonTitle21.put("title", "修正浓度");
							if(!titleArray2.contains(jsonTitle21)){//不存在则添加
								titleArray2.add(jsonTitle21);
							}
							JSONObject jsonTitle23 = new JSONObject();//封装表头
							jsonTitle23.put("field", "standardValue"+dataEntity.getPollutantCode());
							jsonTitle23.put("title", "排放标准");
							if(!titleArray2.contains(jsonTitle23)){//不存在则添加
								titleArray2.add(jsonTitle23);
							}
							json.put("revisedStrength"+dataEntity.getPollutantCode(),dataEntity.getRevisedStrength());
							json.put("standardValue"+dataEntity.getPollutantCode(),dataEntity.getStandardValue());
							
						}
						jsonArray.add(json);
						
					}
				}
				
				
			}
			
		}
		JSONObject jsonObj = new JSONObject();
		jsonObj.put("columns1", titleArray1);
		jsonObj.put("columns2", titleArray2);
		jsonObj.put("rows", jsonArray);
		jsonObj.put("mpType", mpType);
		//jsonObj.put("revisType", revisType);
		result = jsonObj;
		
		
		return SUCCESS;
	}
	
	
	/**
	 * 
	 * <p>Title: getAutoCompletePsInfo</p>  
	 * <p>Description: </p>  
	 * @return
	 */
	public String getPsMpInfo(){
		if(StringUtils.isNotBlank(regionCode)){
			List<Object> list = enforcementQueryService.getPsMpInfo(regionCode,keyName,pageNo,pageSize);
			JSONArray arrays = new JSONArray();
			JSONObject json = new JSONObject();
			Integer total = 0 ;
			if(list.size()>0 && list!= null){
				for(int i=0;i<list.size();i++){
					JSONObject jsonObj = new JSONObject();
					Object[] objs = (Object[]) list.get(i);
					if (objs[0] != null) {
						jsonObj.put("id", objs[0].toString());
					}
					if (objs[1] != null) {
						jsonObj.put("psCode", objs[1].toString());
					}
					if (objs[2] != null) {
						jsonObj.put("psName", objs[2].toString());
					}
					if (objs[3] != null) {
						jsonObj.put("mpCode", objs[3].toString());
					}
					if (objs[4] != null) {
						jsonObj.put("mpName", objs[4].toString());
					}
					if (objs[5] != null) {
						jsonObj.put("mpType", objs[5].toString());
					}
					if (objs[6] != null) {
						jsonObj.put("regionCode", objs[6].toString());
					}
					if (objs[7] != null) {
						jsonObj.put("regionName", objs[7].toString());
					}
					if(i==0){
						if (objs[9] != null) {
							total = Integer.parseInt(objs[9].toString()) ;
						}
					}
					
					arrays.add(jsonObj);
				}
			}
			json.put("total", total);
			json.put("rows", arrays);
			result = json;
		}else{
			return null;
		}
		return SUCCESS;
		
	}
	
	public String getMpByPsId(){
		List<Object> list = new ArrayList<Object>();
		psId = paramEntity.getPsId();
		if(StringUtils.isNotBlank(psId)){
			 list = enforcementQueryService.getMpByPsId(psId);
			 JSONArray jsonArray = new JSONArray();
			 if(list.size()>0 && list!=null){
				 for(int i=0;i<list.size();i++){
					 Object[] obj = (Object[]) list.get(i);
					 JSONObject json = new JSONObject();
					 json.put( "id",(obj[1]==null?"":obj[1].toString()));
					 json.put( "name",(obj[2]==null?"":obj[2].toString()));
					 json.put( "type",(obj[3]==null?"":obj[3].toString()));
					jsonArray.add(json);
				 }
			 }
			 result = jsonArray;
			 
		}else{
			return null;
		}
		
		return SUCCESS;
	}
	
	//=======================================================================//
	public EnforcementQueryService getEnforcementQueryService() {
		return enforcementQueryService;
	}

	public void setEnforcementQueryService(
			EnforcementQueryService enforcementQueryService) {
		this.enforcementQueryService = enforcementQueryService;
	}

	public String getUserRegionCode() {
		return userRegionCode;
	}

	public void setUserRegionCode(String userRegionCode) {
		this.userRegionCode = userRegionCode;
	}

	public Object getResult() {
		return result;
	}

	public void setResult(Object result) {
		this.result = result;
	}

	public String getKeyName() {
		return keyName;
	}

	public void setKeyName(String keyName) {
		this.keyName = keyName;
	}
	public String getPsId() {
		return psId;
	}
	public void setPsId(String psId) {
		this.psId = psId;
	}
	public String getRegionCode() {
		return regionCode;
	}
	public void setRegionCode(String regionCode) {
		this.regionCode = regionCode;
	}
	public Integer getPageNo() {
		return pageNo;
	}
	public void setPageNo(Integer pageNo) {
		this.pageNo = pageNo;
	}
	public Integer getPageSize() {
		return pageSize;
	}
	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}



	
	
	

}
