import React, { useState } from 'react';
import Pagination from '../../../components/Pagination';

const PopulationList = ({ data, ageFilter }) => {
  const columns = [
    { key: 'ref_date', label: '월' },
    { key: 'city_name', label: '시/도' },
    { key: 'district_name', label: '시/군' },
    { key: 'sub_district_name', label: '읍/면/동' },
    { key: 'total_population', label: '총 인구' },
    { key: 'male_population', label: '남자' },
    { key: 'female_population', label: '여자' },
    { key: 'age_under_10s', label: '10대 미만', filter: 'age_under_10s' },
    { key: 'age_10s', label: '10대', filter: 'age_10s' },
    { key: 'age_20s', label: '20대', filter: 'age_20s' },
    { key: 'age_30s', label: '30대', filter: 'age_30s' },
    { key: 'age_40s', label: '40대', filter: 'age_40s' },
    { key: 'age_50s', label: '50대', filter: 'age_50s' },
    { key: 'age_plus_60s', label: '60대 이상', filter: 'age_plus_60s' },
  ];

  const [currentPage, setCurrentPage] = useState(1);  // 현재 페이지
  const pageSize = 20;  // 한 페이지에 보여줄 리스트 개수
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });  // 정렬 상태 관리


  // 정렬 함수
  const sortedData = [...data].sort((a, b) => {
    if (sortConfig.key) {
      const direction = sortConfig.direction === 'asc' ? 1 : -1;
      if (a[sortConfig.key] < b[sortConfig.key]) return -1 * direction;
      if (a[sortConfig.key] > b[sortConfig.key]) return 1 * direction;
      return 0;
    }
    return 0;  // 정렬 상태 없으면 그대로 반환
  });

  // 정렬 버튼 클릭 시 호출될 함수
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

  };

  const filteredColumns = columns.filter(col => {
    if (!col.filter) return true;
    if (!ageFilter || (!ageFilter.ageGroupMin && !ageFilter.ageGroupMax)) {
      return true;
    }

    const filterOrder = ['age_under_10s', 'age_10s', 'age_20s', 'age_30s', 'age_40s', 'age_50s', 'age_plus_60s'];
    const minIndex = ageFilter.ageGroupMin ? filterOrder.indexOf(ageFilter.ageGroupMin) : 0;
    const maxIndex = ageFilter.ageGroupMax ? filterOrder.indexOf(ageFilter.ageGroupMax) : filterOrder.length - 1;
    const colIndex = filterOrder.indexOf(col.filter);
    return colIndex >= minIndex && colIndex <= maxIndex;
  });

  // 현재 페이지에 해당하는 데이터 슬라이싱
  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentData = sortedData.slice(indexOfFirstItem, indexOfLastItem);  // 정렬된 데이터에서 페이징 적용

  const totalPages = Math.ceil(data.length / pageSize);  // 전체 페이지 수 계산

  // 페이지 변경 함수
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            {filteredColumns.map(col => (
              <th key={col.key} className="border border-gray-300 px-4 py-2 font-bold">
                <div className="flex items-center justify-between">
                  {col.label}
                  {col.key !== 'city_name' && col.key !== 'district_name' && col.key !== 'sub_district_name' && (
                    <div className="flex flex-col ml-2">
                      <button onClick={() => handleSort(col.key, 'asc')} className="text-xs">▲</button>
                      <button onClick={() => handleSort(col.key, 'desc')} className="text-xs">▼</button>
                    </div>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentData.map((row, idx) => (
            <tr key={`${row.pop_id || idx}`}>
              {filteredColumns.map(col => (
                <td key={`${row.pop_id || idx}-${col.key}`} className="border border-gray-300 px-4 py-2">
                  {(() => {
                    if (col.key === 'male_population') {
                      return `${row.male_population || 0}명 (${((row.male_population / row.total_population) * 100).toFixed(1)}%)`;
                    } else if (col.key === 'female_population') {
                      return `${row.female_population || 0}명 (${((row.female_population / row.total_population) * 100).toFixed(1)}%)`;
                    } else if (col.key === 'total_population') {
                      return `${row.total_population || 0}명`;
                    } else if (col.key === 'age_under_10s') {
                      return `${row.age_under_10s || 0}명 (${((row.age_under_10s / row.total_population) * 100).toFixed(1)}%)`;
                    } else if (col.key === 'age_10s') {
                      return `${row.age_10s || 0}명 (${((row.age_10s / row.total_population) * 100).toFixed(1)}%)`;
                    } else if (col.key === 'age_20s') {
                      return `${row.age_20s || 0}명 (${((row.age_20s / row.total_population) * 100).toFixed(1)}%)`;
                    } else if (col.key === 'age_30s') {
                      return `${row.age_30s || 0}명 (${((row.age_30s / row.total_population) * 100).toFixed(1)}%)`;
                    } else if (col.key === 'age_40s') {
                      return `${row.age_40s || 0}명 (${((row.age_40s / row.total_population) * 100).toFixed(1)}%)`;
                    } else if (col.key === 'age_50s') {
                      return `${row.age_50s || 0}명 (${((row.age_50s / row.total_population) * 100).toFixed(1)}%)`;
                    } else if (col.key === 'age_plus_60s') {
                      return `${row.age_plus_60s || 0}명 (${((row.age_plus_60s / row.total_population) * 100).toFixed(1)}%)`;
                    } else {
                      return row[col.key];
                    }
                  })()}
                </td>
              ))}
            </tr>
          ))}
        </tbody>

      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>

  );
};

export default PopulationList;
