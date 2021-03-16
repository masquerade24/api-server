const hsptInfo = require('../API/hospitalInfo');
const models = require('../models/');

function search(req, res) {
    try {
        hsptInfo(req.body.address, req.body.hsptNm, async (error, info) => { // 콜백문제 해결해야함 프라미스화 해줘야 하는듯
            const a = await info;
            res.status(200).json({
                telno: a,
                //telno: a["telno"],
                // hsptUrl: a["hospUrl"],
                // addr: a["addr"],
                test: '안녕 나는 테스트야',
            })
        })
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong!',
            error: error
        })
    }
}

module.exports = {
    search,
}