/**
 * 西安交大长天软件股份有限公司
 */
var Actions={
    //项目根路径
    baseUrl:"",
	common:{
	    addProofType:{data:[{"id":"6","text":"停产(排)报告"},{"id":"1","text":"人工监测报告"},{"id":"2","text":"限期整改报告"},{"id":"3","text":"企业异常申报"},{"id":"4","text":"现场监察笔录"},{"id":"5","text":"人工数据修正说明"},{"id":"8","text":"其他"}],text:'text',value:'id'},
        proofType:{data:[{"id":"-99","text":"全部"},{"id":"1","text":"人工监测报告"},{"id":"2","text":"限期整改报告"},{"id":"3","text":"企业异常申报"},{"id":"4","text":"现场监察笔录"},{"id":"5","text":"人工数据修正说明"},{"id":"6","text":"停产(排)报告"},{"id":"8","text":"其他"}],text:'text',value:'id'},
        checkStatus:{data:[{"id":"-99","text":"全部"},{"id":"1","text":"考核"},{"id":"0","text":"非考核"}],text:'text',value:'id'},
        acceptStatus:{data:[{"id":"-99","text":"全部"},{"id":"1","text":"通过"},{"id":"0","text":"未通过"},{"id":"2","text":"未验收"}],text:'text',value:'id'},
        proofStatus:{data:[{"id":"-99","text":"全部"},{"id":"0","text":"未上传"},{"id":"1","text":"已上传"}],text:'text',value:'id'},
		region:baseUrl("am/data/region.json"),
		region_sichuan:baseUrl("am/data/region_sichuan.json")
	}
}