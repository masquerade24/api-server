const hsptInfo = require('../API/hospitalInfo');
const models = require('../models/');

function search(req, res) {
    try {
        hsptInfo(req.body.address, req.body.hsptNm, (error, info) => { // 콜백문제 해결해야함 프라미스화 해줘야 하는듯
            console.log('병원정보 검색 수행');
            res.status(200).json({
                telno: info["telno"],
                hsptUrl: info["hospUrl"],
                addr: info["addr"],
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