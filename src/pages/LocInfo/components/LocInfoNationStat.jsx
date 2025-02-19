import React, { useState } from 'react';

// 헬퍼 함수로 데이터를 찾고 포맷팅
const getStatValue = (initStatData, targetItem, field, divisor = 1, unit = '', date) => {
    const stat = initStatData.find(stat => stat.target_item === targetItem && stat.ref_date === date);
    return stat && stat[field] ? `${(stat[field] / divisor).toFixed(1)}${unit}` : '-';
};

// 최대/최소 값을 모두 표시하는 헬퍼 함수
const getMaxMinValue = (initStatData, targetItem, divisor, unit = '', date) => {
    const stat = initStatData.find(stat => stat.target_item === targetItem && stat.ref_date === date);
    if (stat && stat.max_val !== null && stat.min_val !== null) {
        return `${(stat.max_val / divisor)} / ${(stat.min_val / divisor)}${unit}`;
    }
    return '-';
};

const isValueAboveThreshold = (value) => value >= 0.7;  // 0.7 이상인지 확인

const LocInfoNationStat = ({ initStatData = [], initAllCorrData  = []}) => {

    const [isOpen, setIsOpen] = useState(false); // 테이블의 열림/닫힘 상태

    const toggleOpen = () => {
        setIsOpen(!isOpen); // 열고 닫는 상태를 반전시킴
    };

    return (
        <div>
            <button
                onClick={toggleOpen}
                className="bg-gray-300 px-4 py-2 mb-2 rounded">
                {isOpen ? '통계 테이블 닫기' : '통계 테이블 열기'}
            </button>

            {isOpen && (
                <div>
                    <p className='font-bold mt-4'>
                        2024-11-01 통계 값
                    </p>
                    <table className="border-collapse border border-gray-300 mt-2">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">
                                    {(() => {
                                        const stat = initStatData.find((stat) => stat.target_item === 'shop');
                                        return stat ? `${stat.ref_date}` : '-';
                                    })()}
                                </th>
                                <th className="border border-gray-300 px-4 py-2">업소 수</th>
                                <th className="border border-gray-300 px-4 py-2">업소 평균 매출</th>
                                <th className="border border-gray-300 px-4 py-2">평균 소득</th>
                                <th className="border border-gray-300 px-4 py-2">평균 소비</th>
                                <th className="border border-gray-300 px-4 py-2">유동 인구</th>
                                <th className="border border-gray-300 px-4 py-2">직장 인구</th>
                                <th className="border border-gray-300 px-4 py-2">주거 인구</th>
                                <th className="border border-gray-300 px-4 py-2">세대 수</th>
                                <th className="border border-gray-300 px-4 py-2">아파트 가격</th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr>
                                <th className="border border-gray-300 px-4 py-2">평균</th>
                                <td className="border border-gray-300 px-4 py-2">{getStatValue(initStatData, 'shop', 'avg_val', 1, '개', '2024-11-01')}</td>
                                <td className="border border-gray-300 px-4 py-2">{getStatValue(initStatData, 'sales', 'avg_val', 10000, '만원', '2024-11-01')}</td>
                                <td className="border border-gray-300 px-4 py-2">{getStatValue(initStatData, 'income', 'avg_val', 10000, '만원', '2024-11-01')}</td>
                                <td className="border border-gray-300 px-4 py-2">{getStatValue(initStatData, 'spend', 'avg_val', 10000, '만원', '2024-11-01')}</td>
                                <td className="border border-gray-300 px-4 py-2">{getStatValue(initStatData, 'move_pop', 'avg_val', 1, '명', '2024-11-01')}</td>
                                <td className="border border-gray-300 px-4 py-2">{getStatValue(initStatData, 'work_pop', 'avg_val', 1, '명', '2024-11-01')}</td>
                                <td className="border border-gray-300 px-4 py-2">{getStatValue(initStatData, 'resident', 'avg_val', 1, '명', '2024-11-01')}</td>
                                <td className="border border-gray-300 px-4 py-2">{getStatValue(initStatData, 'house', 'avg_val', 1, '개', '2024-11-01')}</td>
                                <td className="border border-gray-300 px-4 py-2">{getStatValue(initStatData, 'apart_price', 'avg_val', 10000, '만원', '2024-11-01')}</td>
                            </tr>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">표준편차</th>
                                <td className="border border-gray-300 px-4 py-2">{getStatValue(initStatData, 'shop', 'std_val', 1, '개', '2024-11-01')}</td>
                                <td className="border border-gray-300 px-4 py-2">{getStatValue(initStatData, 'sales', 'std_val', 10000, '만원', '2024-11-01')}</td>
                                <td className="border border-gray-300 px-4 py-2">{getStatValue(initStatData, 'income', 'std_val', 10000, '만원', '2024-11-01')}</td>
                                <td className="border border-gray-300 px-4 py-2">{getStatValue(initStatData, 'spend', 'std_val', 10000, '만원', '2024-11-01')}</td>
                                <td className="border border-gray-300 px-4 py-2">{getStatValue(initStatData, 'move_pop', 'std_val', 1, '명', '2024-11-01')}</td>
                                <td className="border border-gray-300 px-4 py-2">{getStatValue(initStatData, 'work_pop', 'std_val', 1, '명', '2024-11-01')}</td>
                                <td className="border border-gray-300 px-4 py-2">{getStatValue(initStatData, 'resident', 'std_val', 1, '명', '2024-11-01')}</td>
                                <td className="border border-gray-300 px-4 py-2">{getStatValue(initStatData, 'house', 'std_val', 1, '개', '2024-11-01')}</td>
                                <td className="border border-gray-300 px-4 py-2">{getStatValue(initStatData, 'apart_price', 'std_val', 10000, '만원', '2024-11-01')}</td>
                            </tr>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">중간값</th>
                                <td className="border border-gray-300 px-4 py-2">{getStatValue(initStatData, 'shop', 'med_val', 1, '개', '2024-11-01')}</td>
                                <td className="border border-gray-300 px-4 py-2">{getStatValue(initStatData, 'sales', 'med_val', 10000, '만원', '2024-11-01')}</td>
                                <td className="border border-gray-300 px-4 py-2">{getStatValue(initStatData, 'income', 'med_val', 10000, '만원', '2024-11-01')}</td>
                                <td className="border border-gray-300 px-4 py-2">{getStatValue(initStatData, 'spend', 'med_val', 10000, '만원', '2024-11-01')}</td>
                                <td className="border border-gray-300 px-4 py-2">{getStatValue(initStatData, 'move_pop', 'med_val', 1, '명', '2024-11-01')}</td>
                                <td className="border border-gray-300 px-4 py-2">{getStatValue(initStatData, 'work_pop', 'med_val', 1, '명', '2024-11-01')}</td>
                                <td className="border border-gray-300 px-4 py-2">{getStatValue(initStatData, 'resident', 'med_val', 1, '명', '2024-11-01')}</td>
                                <td className="border border-gray-300 px-4 py-2">{getStatValue(initStatData, 'house', 'med_val', 1, '개', '2024-11-01')}</td>
                                <td className="border border-gray-300 px-4 py-2">{getStatValue(initStatData, 'apart_price', 'med_val', 10000, '만원', '2024-11-01')}</td>
                            </tr>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">최대/최소</th>
                                <td className="border border-gray-300 px-4 py-2">{getMaxMinValue(initStatData, 'shop', 1, '개', '2024-11-01')}</td>
                                <td className="border border-gray-300 px-4 py-2">{getMaxMinValue(initStatData, 'sales', 10000, '만원', '2024-11-01')}</td>
                                <td className="border border-gray-300 px-4 py-2">{getMaxMinValue(initStatData, 'income', 10000, '만원', '2024-11-01')}</td>
                                <td className="border border-gray-300 px-4 py-2">{getMaxMinValue(initStatData, 'spend', 10000, '만원', '2024-11-01')}</td>
                                <td className="border border-gray-300 px-4 py-2">{getMaxMinValue(initStatData, 'move_pop', 10000, '명', '2024-11-01')}</td>
                                <td className="border border-gray-300 px-4 py-2">{getMaxMinValue(initStatData, 'work_pop', 1, '명', '2024-11-01')}</td>
                                <td className="border border-gray-300 px-4 py-2">{getMaxMinValue(initStatData, 'resident', 1, '명', '2024-11-01')}</td>
                                <td className="border border-gray-300 px-4 py-2">{getMaxMinValue(initStatData, 'house', 1, '개', '2024-11-01')}</td>
                                <td className="border border-gray-300 px-4 py-2">{getMaxMinValue(initStatData, 'apart_price', 10000, '만원', '2024-11-01')}</td>
                            </tr>
                        </tbody>
                    </table>
                    <p className='font-bold mt-4'>
                        2024-11-01 상관분석
                    </p>
                    <table className="border-collapse border border-gray-300 mt-4">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">상관분석</th>
                                <th className="border border-gray-300 px-4 py-2">업소 수</th>
                                <th className="border border-gray-300 px-4 py-2">업소 평균 매출</th>
                                <th className="border border-gray-300 px-4 py-2">평균 소득</th>
                                <th className="border border-gray-300 px-4 py-2">평균 소비</th>
                                <th className="border border-gray-300 px-4 py-2">유동 인구</th>
                                <th className="border border-gray-300 px-4 py-2">직장 인구</th>
                                <th className="border border-gray-300 px-4 py-2">주거 인구</th>
                                <th className="border border-gray-300 px-4 py-2">세대수</th>
                                <th className="border border-gray-300 px-4 py-2">아파트 가격</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan="1" className="border px-4 py-2 text-center">업소 수</td>
                                <td colSpan="1" className="border px-4 py-2 text-center">1</td>
                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                            </tr>
                            <tr>
                                <td colSpan="1" className="border px-4 py-2 text-center">업소 평균 매출</td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(initAllCorrData["2024-11-01"]["SHOP"]["SALES"]) ? 'red' : 'black' }}
                                >
                                    {initAllCorrData["2024-11-01"]["SHOP"]["SALES"].toFixed(3)}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center">1</td>
                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                            </tr>
                            <tr>
                                <td colSpan="1" className="border px-4 py-2 text-center">평균 소득</td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(initAllCorrData["2024-11-01"]["SHOP"]["INCOME"]) ? 'red' : 'black' }}
                                >
                                    {initAllCorrData["2024-11-01"]["SHOP"]["INCOME"].toFixed(3)}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(initAllCorrData["2024-11-01"]["SALES"]["INCOME"]) ? 'red' : 'black' }}
                                >
                                    {initAllCorrData["2024-11-01"]["SALES"]["INCOME"].toFixed(3)}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center">1</td>
                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                            </tr>
                            <tr>
                                <td colSpan="1" className="border px-4 py-2 text-center">평균 소비</td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(initAllCorrData["2024-11-01"]["SHOP"]["SPEND"]) ? 'red' : 'black' }}
                                >
                                    {initAllCorrData["2024-11-01"]["SHOP"]["SPEND"].toFixed(3)}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(initAllCorrData["2024-11-01"]["SALES"]["SPEND"]) ? 'red' : 'black' }}
                                >
                                    {initAllCorrData["2024-11-01"]["SALES"]["SPEND"].toFixed(3)}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(initAllCorrData["2024-11-01"]["INCOME"]["SPEND"]) ? 'red' : 'black' }}
                                >
                                    {initAllCorrData["2024-11-01"]["INCOME"]["SPEND"].toFixed(3)}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center">1</td>
                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                            </tr>
                            <tr>
                                <td colSpan="1" className="border px-4 py-2 text-center">유동 인구</td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(initAllCorrData["2024-11-01"]["SHOP"]["MOVE_POP"]) ? 'red' : 'black' }}
                                >
                                    {initAllCorrData["2024-11-01"]["SHOP"]["MOVE_POP"].toFixed(3)}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(initAllCorrData["2024-11-01"]["SALES"]["MOVE_POP"]) ? 'red' : 'black' }}
                                >
                                    {initAllCorrData["2024-11-01"]["SALES"]["MOVE_POP"].toFixed(3)}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(initAllCorrData["2024-11-01"]["INCOME"]["MOVE_POP"]) ? 'red' : 'black' }}
                                >
                                    {initAllCorrData["2024-11-01"]["INCOME"]["MOVE_POP"].toFixed(3)}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(initAllCorrData["2024-11-01"]["SPEND"]["MOVE_POP"]) ? 'red' : 'black' }}
                                >
                                    {initAllCorrData["2024-11-01"]["SPEND"]["MOVE_POP"].toFixed(3)}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center">1</td>
                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                            </tr>
                            <tr>
                                <td colSpan="1" className="border px-4 py-2 text-center">직장 인구</td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(initAllCorrData["2024-11-01"]["SHOP"]["WORK_POP"]) ? 'red' : 'black' }}
                                >
                                    {initAllCorrData["2024-11-01"]["SHOP"]["WORK_POP"].toFixed(3)}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(initAllCorrData["2024-11-01"]["SALES"]["WORK_POP"]) ? 'red' : 'black' }}
                                >
                                    {initAllCorrData["2024-11-01"]["SALES"]["WORK_POP"].toFixed(3)}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(initAllCorrData["2024-11-01"]["INCOME"]["WORK_POP"]) ? 'red' : 'black' }}
                                >
                                    {initAllCorrData["2024-11-01"]["INCOME"]["WORK_POP"].toFixed(3)}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(initAllCorrData["2024-11-01"]["SPEND"]["WORK_POP"]) ? 'red' : 'black' }}
                                >
                                    {initAllCorrData["2024-11-01"]["SPEND"]["WORK_POP"].toFixed(3)}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(initAllCorrData["2024-11-01"]["MOVE_POP"]["WORK_POP"]) ? 'red' : 'black' }}
                                >
                                    {initAllCorrData["2024-11-01"]["MOVE_POP"]["WORK_POP"].toFixed(3)}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center">1</td>
                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                            </tr>
                            <tr>
                                <td colSpan="1" className="border px-4 py-2 text-center">주거 인구</td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(initAllCorrData["2024-11-01"]["SHOP"]["RESIDENT"]) ? 'red' : 'black' }}
                                >
                                    {initAllCorrData["2024-11-01"]["SHOP"]["RESIDENT"].toFixed(3)}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(initAllCorrData["2024-11-01"]["SALES"]["RESIDENT"]) ? 'red' : 'black' }}
                                >
                                    {initAllCorrData["2024-11-01"]["SALES"]["RESIDENT"].toFixed(3)}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(initAllCorrData["2024-11-01"]["INCOME"]["RESIDENT"]) ? 'red' : 'black' }}
                                >
                                    {initAllCorrData["2024-11-01"]["INCOME"]["RESIDENT"].toFixed(3)}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(initAllCorrData["2024-11-01"]["SPEND"]["RESIDENT"]) ? 'red' : 'black' }}
                                >
                                    {initAllCorrData["2024-11-01"]["SPEND"]["RESIDENT"].toFixed(3)}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(initAllCorrData["2024-11-01"]["MOVE_POP"]["RESIDENT"]) ? 'red' : 'black' }}
                                >
                                    {initAllCorrData["2024-11-01"]["MOVE_POP"]["RESIDENT"].toFixed(3)}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(initAllCorrData["2024-11-01"]["WORK_POP"]["RESIDENT"]) ? 'red' : 'black' }}
                                >
                                    {initAllCorrData["2024-11-01"]["WORK_POP"]["RESIDENT"].toFixed(3)}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center">1</td>
                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                            </tr>
                            <tr>
                                <td colSpan="1" className="border px-4 py-2 text-center">세대수</td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(initAllCorrData["2024-11-01"]["SHOP"]["HOUSE"]) ? 'red' : 'black' }}
                                >
                                    {initAllCorrData["2024-11-01"]["SHOP"]["HOUSE"].toFixed(3)}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(initAllCorrData["2024-11-01"]["SALES"]["HOUSE"]) ? 'red' : 'black' }}
                                >
                                    {initAllCorrData["2024-11-01"]["SALES"]["HOUSE"].toFixed(3)}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(initAllCorrData["2024-11-01"]["INCOME"]["HOUSE"]) ? 'red' : 'black' }}
                                >
                                    {initAllCorrData["2024-11-01"]["INCOME"]["HOUSE"].toFixed(3)}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(initAllCorrData["2024-11-01"]["SPEND"]["HOUSE"]) ? 'red' : 'black' }}
                                >
                                    {initAllCorrData["2024-11-01"]["SPEND"]["HOUSE"].toFixed(3)}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(initAllCorrData["2024-11-01"]["MOVE_POP"]["HOUSE"]) ? 'red' : 'black' }}
                                >
                                    {initAllCorrData["2024-11-01"]["MOVE_POP"]["HOUSE"].toFixed(3)}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(initAllCorrData["2024-11-01"]["WORK_POP"]["HOUSE"]) ? 'red' : 'black' }}
                                >
                                    {initAllCorrData["2024-11-01"]["WORK_POP"]["HOUSE"].toFixed(3)}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(initAllCorrData["2024-11-01"]["RESIDENT"]["HOUSE"]) ? 'red' : 'black' }}
                                >
                                    {initAllCorrData["2024-11-01"]["RESIDENT"]["HOUSE"].toFixed(3)}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center">1</td>
                                <td colSpan="1" className="border px-4 py-2 text-center"></td>
                            </tr>
                            <tr>
                                <td colSpan="1" className="border px-4 py-2 text-center">아파트 가격</td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(initAllCorrData["2024-11-01"]["SHOP"]["APART_PRICE"]) ? 'red' : 'black' }}
                                >
                                    {initAllCorrData["2024-11-01"]["SHOP"]["APART_PRICE"].toFixed(3)}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(initAllCorrData["2024-11-01"]["SALES"]["APART_PRICE"]) ? 'red' : 'black' }}
                                >
                                    {initAllCorrData["2024-11-01"]["SALES"]["APART_PRICE"].toFixed(3)}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(initAllCorrData["2024-11-01"]["INCOME"]["APART_PRICE"]) ? 'red' : 'black' }}
                                >
                                    {initAllCorrData["2024-11-01"]["INCOME"]["APART_PRICE"].toFixed(3)}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(initAllCorrData["2024-11-01"]["SPEND"]["APART_PRICE"]) ? 'red' : 'black' }}
                                >
                                    {initAllCorrData["2024-11-01"]["SPEND"]["APART_PRICE"].toFixed(3)}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(initAllCorrData["2024-11-01"]["MOVE_POP"]["APART_PRICE"]) ? 'red' : 'black' }}
                                >
                                    {initAllCorrData["2024-11-01"]["MOVE_POP"]["APART_PRICE"].toFixed(3)}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(initAllCorrData["2024-11-01"]["WORK_POP"]["APART_PRICE"]) ? 'red' : 'black' }}
                                >
                                    {initAllCorrData["2024-11-01"]["WORK_POP"]["APART_PRICE"].toFixed(3)}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(initAllCorrData["2024-11-01"]["RESIDENT"]["APART_PRICE"]) ? 'red' : 'black' }}
                                >
                                    {initAllCorrData["2024-11-01"]["RESIDENT"]["APART_PRICE"].toFixed(3)}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center"
                                    style={{ color: isValueAboveThreshold(initAllCorrData["2024-11-01"]["HOUSE"]["APART_PRICE"]) ? 'red' : 'black' }}
                                >
                                    {initAllCorrData["2024-11-01"]["HOUSE"]["APART_PRICE"].toFixed(3)}
                                </td>
                                <td colSpan="1" className="border px-4 py-2 text-center">1</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default LocInfoNationStat;
