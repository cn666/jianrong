package com.jointsky.automonitor.enforcementquery.manager;

import java.util.HashMap;
import java.util.List;

import com.jointsky.automonitor.enforcementquery.entity.DataEntity;
import com.jointsky.automonitor.enforcementquery.entity.ParamEntity;
import com.jointsky.automonitor.enforcementquery.entity.PollutantsEntity;

/**
 * 
    * @ClassName: EnforcementQueryService  
    * @Description: TODO(四川移动执法查询国控数据Service)  
    * @author Administrator  
    * @date 2018年5月29日  
    *
 */
public interface EnforcementQueryService {
	/**
	 * 
	 * <p>Title: getPsMpInfo</p>  
	 * <p>Description: 查询污染源和监控点</p>  
	 * @param regionCode
	 * @param keyName
	 * @return 
	 */
	List<Object>  getPsMpInfo(String regionCode, String keyName, Integer pageNo,
			Integer pageSize);
	/**
	 * 
	 * <p>Title: getMpByPsId</p>  
	 * <p>Description:通过企业ID查询监控点 </p>  
	 * @param psId
	 * @return
	 */
	List<Object> getMpByPsId(String psId);
	
	
	/**
	* <p>Title: getPollutants</p>
	* <p>Description: TODO(污染物查询)</p>
	*  @param pollutantType 污染物类型
	*  @return    设定文件 
	* @return PollutantsCode    返回类型
	*/
	HashMap<String, PollutantsEntity> getPollutants(String pollutantType);
	/**
	 * 
	 * <p>Title: findList</p>  
	 * <p>Description: 查询方法</p>  
	 * @param paramEntity
	 * @return
	 */
	List<DataEntity> findList(ParamEntity paramEntity);

}
