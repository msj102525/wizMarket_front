import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Header from '../../components/Header';
import KakaoMap from '../../components/KakaoMap';
import axios from 'axios';
import CommercialDistrictList2 from './components/CommercialDistrictList2'; // 리스트 컴포넌트 가져오기

const CommercialDistrict2 = () => {
    const administrativeAddress = useSelector((state) => state.address.administrativeAddress);
    const roadAddress = useSelector((state) => state.address.roadAddress);

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const extractSubDistrict = (address) => {
        const parts = address.split(' ');
        if (parts.length > 2) {
            if (parts.length > 3) {
                return parts.slice(3).join(' ');
            }
            return parts.slice(2).join(' ');
        }
        return '';
    };

    useEffect(() => {
        const fetchData = async () => {
            if (!administrativeAddress) return;

            setLoading(true);
            setError(null);

            const subDistrict = extractSubDistrict(administrativeAddress);

            try {
                const response = await axios.get(`${process.env.REACT_APP_FASTAPI_BASE_URL}/commercial`, {
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                    },
                    params: { sub_district: subDistrict },
                });
                console.log(response);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data from FastAPI', error);
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [administrativeAddress]);

    return (
        <div>
            <Header />
            <div className="px-6">
                <div>도로명 주소: {roadAddress}</div>
                <div>행정동 주소: {administrativeAddress}</div>

                <div className="flex gap-2">
                    <div className="">
                        <KakaoMap />
                    </div>
                    <div className="">
                        <p>지도중심기준 상권분석</p>
                        {loading && <p>Loading...</p>}
                        {error && <p>Error: {error}</p>}
                        {data && !loading && !error && (
                            <CommercialDistrictList2 data={data} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommercialDistrict2;
