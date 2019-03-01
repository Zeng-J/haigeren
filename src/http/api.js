// 导入http.js的内容
import{getInfoByWhere,getAllInfo,getMsgById,putMsg, postMsg} from './http.js'

// ===================get======================
// 获取整个用户表
export const GetAllUser = () => getAllInfo('/tb_user');
// export const GetAllUser_x = () => getAllInfo('/tb_user/OI7g333H');

// 根据条件查询用户表
export const GetUserByParam = p => getInfoByWhere('/tb_user',p);

// 根据ID查询用户表
export const getUserMsgById = p => getMsgById('/tb_user',p);

// 根据条件查询成就表
export const GetAchieveByParam = p => getInfoByWhere('/tb_record',p);

// 获取整个动态表
export const GetAllDynamic = () => getAllInfo('/tb_dynamic');

// ==================put===============================
// 修改动态表某条动态数据
export const putDynamic = (dynamic_id,p) =>putMsg('/tb_dynamic',dynamic_id,p);

// 增加一条动态
export const postDynamic = p => postMsg('/tb_dynamic',p);

// 增加一条成就
export const postAch = p => postMsg('/tb_record',p);