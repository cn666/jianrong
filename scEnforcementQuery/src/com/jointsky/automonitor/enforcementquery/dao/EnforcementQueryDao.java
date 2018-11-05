package com.jointsky.automonitor.enforcementquery.dao;

import java.util.HashMap;
import java.util.List;

import com.jointsky.automonitor.enforcementquery.entity.DataEntity;
import com.jointsky.automonitor.enforcementquery.entity.ParamEntity;
import com.jointsky.automonitor.enforcementquery.entity.PollutantsEntity;

/**
 * 
    * @ClassName: EnforcementQueryDao  
    * @Description: TODO(四川移动执法查询国控数据Dao)  
    * @author Administrator  
    * @date 2018年5月29日  
    *
 */
public interface EnforcementQueryDao {
	/**
	 * 
	 * <p>Title:getPsMpInfo</p>  
	 * <p>Description: 查询污染源和监控点</p>  
	 * @param regionCode
	 * @param keyName
	 * @return
	 */
	List<Object>  getPsMpInfo(String regionCode, String keyName, Integer pageNo,
			Integer pageSize);;
	/**
	 * 
	 * <p>Title: getMpByPsId</p>  
	 * <p>Description:通过企业ID查询监控点 </p>  
	 * @param psId
	 * @return
	 */
	List<Object> getMpByPsId(String psId);
	/**
	 * 
	 * <p>Title: getPollutants</p>  
	 * <p>Description:根据污染物类型获取污染物集合 </p>  
	 * @param pollutantType
	 * @return
	 */
	HashMap<String, PollutantsEntity> getPollutants(String pollutantType);
	/**
	 * 
	 * <p>Title: findList</p>  
	 * <p>Description:查询方法 </p>  
	 * @param paramEntity
	 * @return
	 */
	List<DataEntity> findList(ParamEntity paramEntity);

}
