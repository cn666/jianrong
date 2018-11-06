package com.jointsky.automonitor.enforcementquery.dao.impl;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.hibernate.Query;
import org.hibernate.Session;

import com.jointsky.automonitor.enforcementquery.dao.EnforcementQueryDao;
import com.jointsky.automonitor.enforcementquery.entity.DataEntity;
import com.jointsky.automonitor.enforcementquery.entity.ParamEntity;
import com.jointsky.automonitor.enforcementquery.entity.PollutantsEntity;
import com.jointsky.automonitor.enforcementquery.utils.HibernateSessionFactory;

public class EnforcementQueryDaoImpl implements EnforcementQueryDao {
	private static EnforcementQueryDao dao=null;
	public static synchronized EnforcementQueryDao getInstall(){
		if(dao == null) 
			dao=new EnforcementQueryDaoImpl();
		return dao;
	}
	@Override
	public List<Object>  getPsMpInfo(String regionCode, String keyName, Integer pageNo,
			Integer pageSize){
		if(keyName==null){
			keyName="";
		}
		String sql = "{Call ProcV3GetPsMpInfo(?,?,?,?)} ";
		Session session=HibernateSessionFactory.getSession();
		Query query=session.createSQLQuery(sql);
		query.setParameter(0, regionCode);
		query.setParameter(1, keyName);
		query.setParameter(2, pageNo);
		query.setParameter(3, pageSize);
		@SuppressWarnings("unchecked")
		List<Object> list = query.list();
		return list;
	}
	@Override
	public List<Object> getMpByPsId(String psId) {
		String sql = "{Call  ProcV3GetPsMpByPsId(?)} ";
		Session session=HibernateSessionFactory.getSession();
		Query query=session.createSQLQuery(sql);
		query.setParameter(0, psId);
		@SuppressWarnings("unchecked")
		List<Object> list = query.list();
		return list;
	}
	@Override
	public HashMap<String, PollutantsEntity> getPollutants(String pollutantType) {
		String sql="select CONVERT (varchar, a.PollutantCode) as PollutantCode,a.PollutantName,b.MeasureUnitName "
				+ "from [Dictionary].[PollutantCode]  a "
				+ "left join  [Dictionary].[MeasureUnit] b on b.[MeasureUnitCode] =a.MeasureUnitCode "
				+ " where a.[PollutantTypeCode] = ? and  a.[DeleteFlag] = 0 ";
		
		HashMap<String, PollutantsEntity> map=new HashMap<String, PollutantsEntity>();
		Session session=HibernateSessionFactory.getSession();
		Query query=session.createSQLQuery(sql);
		query.setParameter(0, pollutantType);
		@SuppressWarnings("unchecked")
		List<Object> list=query.list();
		if(list!=null){
			for(int i=0;i<list.size();i++){
				Object[] objs=(Object[]) list.get(i);
				PollutantsEntity entity=new PollutantsEntity();
				entity.setPollCode(objs[0].toString());
				entity.setPollName(objs[1].toString());
				if(objs[2]!=null){
					entity.setUnit(objs[2].toString());
				}
				map.put(entity.getPollCode(),entity);
			}
		}
		return map;
	
	}
	@Override
	public List<DataEntity> findList(ParamEntity paramEntity) {
		if(paramEntity==null){
			return null;
		}
		String mpTypeCode =paramEntity.getMpTypeCode();
		if(StringUtils.isBlank(mpTypeCode)){
			return null;
		}
		Integer mpType=0;
		if(mpTypeCode.equals("4")){
			mpType=1;
		}else if(mpTypeCode.equals("5")){
			mpType=2;
		}else if(mpTypeCode.equals("6")){
			mpType=3;
		}
		String psId = paramEntity.getPsId()==null?"":paramEntity.getPsId();
		String mpId = paramEntity.getSearch_mpId()==null?"":paramEntity.getMpId();
		String dataType = paramEntity.getSearch_dataType()==null?"":paramEntity.getSearch_dataType();
		String revisType = paramEntity.getSearch_revisType()==null?"":paramEntity.getSearch_revisType();
		String times = paramEntity.getSearch_startEndTimeParm()==null?"":paramEntity.getSearch_startEndTimeParm();
		String startTime ="";
		String endTime="";
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		if(StringUtils.isNotBlank(times)){
			startTime= times.substring(0, 10)+" 00:00:00";
			endTime = times.substring(11, 21)+" 23:59:59";
		}else{
			startTime= sdf.format(new Date())+" 00:00:00";
			endTime =sdf.format(new Date())+" 23:59:59";
		}
		
		Session session=HibernateSessionFactory.getSession();
		String sql ="{Call ProcGetSCDayHourData(?,?,?,?,?,?,?)}";
		Query query=session.createSQLQuery(sql);
		query.setParameter(0, psId);
		query.setParameter(1, mpId);
		query.setParameter(2, mpType);
		query.setParameter(3, startTime);
		query.setParameter(4, endTime);
		query.setParameter(5, dataType);
		query.setParameter(6, revisType);
		
		
		@SuppressWarnings("unchecked")
		List<Object> list =query.list();
		List<DataEntity> dataList = new ArrayList<DataEntity>();
		
		if(list!=null&&list.size()>0){
			if(mpType == 2){//气
				HashMap<String, PollutantsEntity> map =getPollutants("2");
				if(revisType.equals("0")){//修约前
					for(int i=0;i<list.size();i++){
						Object[] obj = (Object[]) list.get(i);
						DataEntity entity = new DataEntity();
						
						entity.setPsCode(obj[0]==null?"-":obj[0].toString());
						entity.setMpCode(obj[1]==null?"-":obj[1].toString());
						entity.setMonitorTime(obj[2]==null?"-":obj[2].toString());
						entity.setStandardValue(obj[10]==null?"-":obj[10].toString());
						entity.setSo1(obj[11]==null?"-":obj[11].toString());
						
						entity.setAvgStrength(obj[4]==null?"-":obj[4].toString());
						entity.setZsAvgStrength(obj[5]==null?"-":obj[5].toString());
						entity.setFlow(obj[6]==null?"-":obj[6].toString());
						
						String pollutantCode = obj[3]==null?"-":obj[3].toString();
						entity.setPollutantCode(pollutantCode);
						entity.setPollutantName(map.get(pollutantCode).getPollName());
						entity.setPollutantUnit(map.get(pollutantCode).getUnit());
						
						dataList.add(entity);
					
					}
					
				}else if(revisType.equals("1")){//修约后
					for(int i=0;i<list.size();i++){
						Object[] obj = (Object[]) list.get(i);
						DataEntity entity = new DataEntity();
						
						entity.setPsCode(obj[0]==null?"-":obj[0].toString());
						entity.setMpCode(obj[1]==null?"-":obj[1].toString());
						entity.setMonitorTime(obj[2]==null?"-":obj[2].toString());
						entity.setStandardValue(obj[10]==null?"-":obj[10].toString());
						entity.setSo1(obj[11]==null?"-":obj[11].toString());
						
						entity.setRevisedStrength(obj[7]==null?"-":obj[7].toString());
						entity.setRevisedZsStrength(obj[8]==null?"-":obj[8].toString());
						entity.setRevisedFlow(obj[9]==null?"-":obj[9].toString());
						
						String pollutantCode = obj[3]==null?"-":obj[3].toString();
						entity.setPollutantCode(pollutantCode);
						entity.setPollutantName(map.get(pollutantCode).getPollName());
						entity.setPollutantUnit(map.get(pollutantCode).getUnit());
						
						dataList.add(entity);
					}
				}
				
			}else{//水
				HashMap<String, PollutantsEntity> map =getPollutants("1");
				if(revisType.equals("0")){//修约前
					for(int i=0;i<list.size();i++){
						Object[] obj = (Object[]) list.get(i);
						DataEntity entity = new DataEntity();
						
						entity.setPsCode(obj[0]==null?"-":obj[0].toString());
						entity.setMpCode(obj[1]==null?"-":obj[1].toString());
						entity.setMonitorTime(obj[2]==null?"-":obj[2].toString());
						entity.setStandardValue(obj[8]==null?"-":obj[8].toString());
						
						entity.setAvgStrength(obj[4]==null?"-":obj[4].toString());
						entity.setFlow(obj[5]==null?"-":obj[5].toString());
						
						String pollutantCode = obj[3]==null?"-":obj[3].toString();
						entity.setPollutantCode(pollutantCode);
						
						entity.setPollutantName(map.get(pollutantCode).getPollName());
						entity.setPollutantUnit(map.get(pollutantCode).getUnit());
						
						dataList.add(entity);
					}
					
				}else if(revisType.equals("1")){//修约后
					for(int i=0;i<list.size();i++){
						Object[] obj = (Object[]) list.get(i);
						DataEntity entity = new DataEntity();
						
						entity.setPsCode(obj[0]==null?"-":obj[0].toString());
						entity.setMpCode(obj[1]==null?"-":obj[1].toString());
						entity.setMonitorTime(obj[2]==null?"-":obj[2].toString());
						entity.setStandardValue(obj[8]==null?"-":obj[8].toString());
						
						entity.setRevisedStrength(obj[6]==null?"-":obj[6].toString());
						entity.setRevisedFlow(obj[7]==null?"-":obj[7].toString());
						
						String pollutantCode = obj[3]==null?"-":obj[3].toString();
						entity.setPollutantCode(pollutantCode);
						entity.setPollutantName(map.get(pollutantCode).getPollName());
						entity.setPollutantUnit(map.get(pollutantCode).getUnit());
					
						dataList.add(entity);
					}
				}
			}
		}
		
		
		return dataList;
	}
}
