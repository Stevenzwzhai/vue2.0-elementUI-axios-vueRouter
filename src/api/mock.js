/**
 * Created by stevenzwzhai on 2017/8/16.
 */
import Mock from 'mockjs'

const baseUrl = "http://www.jiekou.cn/"
const Random = Mock.Random
export default function(){
	//首页数据
	Mock.mock(`${baseUrl}getdbdata2`, {
		"data":Array(10).fill(1).map(() => {
			return {
				appname:Random.last(),
				cmpname:Random.first(),
				devname:Random.cname(),
				mobile:Random.integer(15000000000, 15999999999),
				email:Random.email(),
				desc:Random.sentence( 7, 12 ),
				icon:Random.dataImage('88x31')
			}
		})
	});
	//未添加应用列表
	Mock.mock(`${baseUrl}getdbdata3`, {
		"data":Array(10).fill(1).map(() => {
			return {
				appname:Random.last(),
				cmpname:Random.first(),
				devname:Random.cname(),
				mobile:Random.integer(15000000000, 15999999999),
				email:Random.email(),
				desc:Random.sentence( 7, 12 ),
				icon:Random.dataImage('88x31')
			}
		})
	});
	//手机列表1
	Mock.mock(`${baseUrl}getdbdata4`, {
		"data":Array(10).fill(1).map(() => {
			return {
				username:Random.last(),
				mobile:Random.integer(18000000000, 18999999999),
			}
		})
	});
	//手机列表2
	Mock.mock(`${baseUrl}getdbdata5`, {
		"data":Array(10).fill(1).map(() => {
			return {
				username:Random.last(),
				mobile:Random.integer(13000000000, 13999999999),
			}
		})
	});
}
