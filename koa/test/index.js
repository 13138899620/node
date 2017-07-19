import test from 'ava'
import social from '../service/socialService'
import aesHelper from '../app/helper/aesHelper'

test("createUserInfo", async t => {
    let model = {
        RecruitCaseID: 1,
        Name: "阳毅",
        Email: "943130995@qq.com",
        IDCard: "42068319930206581X",
        Mobile: "13138899620",
        WeChat: "yy943130995",
        CreateName: "v_byyang"
    }
    model.key = aesHelper.md5Signature(Date.now(), model.IDCard)
    let data = await social.createUserInfo(model)
    t.truthy(data)
}) 
