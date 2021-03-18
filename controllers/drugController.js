const drugInfo = require('../API/drugInfo');
const models = require('../models/');

exports.search = (req, res) => {
    models.DB_drug
        .findOne({
            where: {
                printFront: req.body.print,
                drugShape: req.body.shape,
                colorClass1: req.body.color,
            },
        })
        .then(drug => {
            if (drug) {
                drugInfo(drug.itemName, (error, info) => {
                    res.status(200).json({
                        itemName: drug.itemName,
                        entpName: info["entpName"],
                        itemImage: info["itemImage"],
                        efficiency: info["efcyQesitm"].replace(/(<p>|<\/p>)+/g, '\n').trim(),
                        useMethod: info["useMethodQesitm"].replace(/(<p>|<\/p>)+/g, '\n').trim(),
                        warning: info["atpnQesitm"].replace(/(<p>|<\/p>)+/g, '\n').trim(),
                        intrcnt: info["intrcQesitm"].replace(/(<p>|<\/p>)+/g, '\n').trim(),
                        sideEffect: info["seQesitm"].replace(/(<p>|<\/p>)+/g, '\n').trim(),
                        depositMethod: info["depositMethodQesitm"].replace(/(<p>|<\/p>)+/g, '\n').trim(),
                    })
                })
                console.log('약 조회에 성공했습니다.');
            } else {
                res.status(401).json({
                    message: 'Cannot found matching drug!',
                })
            }
        })
        .catch(error => {
            res.status(500).json({
                message: 'Something went wrong!',
            })
        });
};

exports.save = (req, res) => {
    models.DB_drug
        .findOne({
            where: {
                printFront: req.body.print,
                drugShape: req.body.shape,
                colorClass1: req.body.color,
            },
        })
        .then(drug => {
            if (drug) {
                console.log(req.params.id);
                drugInfo(drug.itemName, (error, info) => {
                    models.Drug.create({
                        entpName: info["entpName"],
                        itemName: drug.itemName,
                        efficiency: info["efcyQesitm"].replace(/(<p>|<\/p>)+/g, '\n').trim(),
                        useMethod: info["useMethodQesitm"].replace(/(<p>|<\/p>)+/g, '\n').trim(),
                        warning: info["atpnQesitm"].replace(/(<p>|<\/p>)+/g, '\n').trim(),
                        intrcnt: info["intrcQesitm"].replace(/(<p>|<\/p>)+/g, '\n').trim(),
                        sideEffect: info["seQesitm"].replace(/(<p>|<\/p>)+/g, '\n').trim(),
                        depositMethod: info["depositMethodQesitm"].replace(/(<p>|<\/p>)+/g, '\n').trim(),
                        itemImage: info["itemImage"],
                        UserId: req.user.id,
                    })
                })
                res.status(201).json({
                    message: 'my복용함에 저장되었습니다!'
                })
            } else {
                res.status(401).json({
                    message: '약 검색에 실패했습니다. 사진을 다시 찍어주세요.'
                })
            }
        })
        .catch(error => {
            res.status(500).json({
                message: 'Something went wrong!',
            });
        });
}

exports.deleteMyDrug = (req, res) => {
    console.log('등록한 약 삭제 호출');

    models.Drug
        .destroy({
            where: {
                id: req.params.id,
            }
        })
        .then((result) => {
            res.status(200).json({
                message: '등록한 약 삭제에 성공했습니다.',
                result,
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'Something went wrong!',
            })
        })
}

let foundDrug = (req, res) => { // 프라미스화 하면 사용가능할 수도?
    const drug = models.DB_drug
        .findOne({
            where: {
                printFront: req.body.print,
                drugShape: req.body.shape,
                colorClass1: req.body.color,
            },
        });
    return drug;
};