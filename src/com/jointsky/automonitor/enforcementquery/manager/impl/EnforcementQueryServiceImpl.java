package com.jointsky.automonitor.enforcementquery.manager.impl;

import java.util.HashMap;
import java.util.List;

import com.jointsky.automonitor.enforcementquery.dao.EnforcementQueryDao;
import com.jointsky.automonitor.enforcementquery.dao.impl.EnforcementQueryDaoImpl;
import com.jointsky.automonitor.enforcementquery.entity.DataEntity;
import com.jointsky.automonitor.enforcementquery.entity.ParamEntity;
import com.jointsky.automonitor.enforcementquery.entity.PollutantsEntity;
import com.jointsky.automonitor.enforcementquery.manager.EnforcementQueryService;

public class EnforcementQueryServiceImpl implements EnforcementQueryService {

	
	private EnforcementQueryDao enforcementQueryDao = EnforcementQueryDaoImpl.getInstall();
	
	private static EnforcementQueryService service;
	
	public static EnforcementQueryService getInstance(){
		if(service==null) 
			service=new EnforcementQueryServiceImpl();
		return service;
		 
	}

	@Override
	public List<Object>  getPsMpInfo(String regionCode, String keyName, Integer pageNo,
			Integer pageSize){
		return enforcementQueryDao.getPsMpInfo(regionCode,keyName,pageNo,pageSize);
	}
	
	@Override
	public List<Object> getMpByPsId(String psId) {
		return enforcementQueryDao. getMpByPsId(psId);
	}

	@Override
	public HashMap<String, PollutantsEntity> getPollutants(String pollutantType) {
		return enforcementQueryDao.getPollutants(pollutantType);
	}

	@Override
	public List<DataEntity> findList(ParamEntity paramEntity) {
		return enforcementQueryDao.findList(paramEntity);
	}
		
}
