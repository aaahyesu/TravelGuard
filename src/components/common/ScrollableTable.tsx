import React, { FC } from "react";
import styled from "@emotion/styled";

const ScrollWrapper = styled.div`
  max-height: 560px;
  width: 100%;
  overflow-x: auto;
  padding: 0 10px;

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #5e5e5e;
    border-radius: 10px;
  }

  @media (max-width: 768px) {
    padding: 0 5px;
  }
`;

const TableContainer = styled.div`
  background: rgba(41, 46, 52, 0.7);
  border-radius: 10px;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 5px;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 1px;

  th,
  td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #5e5e5e;
    line-height: 150%;
    word-break: break-word;
  }

  th {
    color: #7fa9ff;
    border-bottom: 2px solid #7fa9ff;
    font-size: 24px;
    line-height: 100%;
    font-weight: 500;

    @media (max-width: 768px) {
      font-size: 16px;
      padding: 8px;
      position: sticky;
    }
  }

  th:nth-of-type(1) {
    width: 15%;
  }

  th:nth-of-type(4),
  th:nth-of-type(5) {
    width: 15%;
  }

  td {
    background: rgba(44, 47, 51, 0.5);
    color: #f0f0f0;
    font-size: 20px;
    padding-right: 5px;

    @media (max-width: 768px) {
      font-size: 14px;
    }
  }

  tr:hover td {
    background: rgba(44, 47, 51, 0.8);
  }
`;

interface ScrollableTableProps {
  headers: string[];
  data: any[];
  renderRow: (item: any) => JSX.Element;
}

const ScrollableTable: FC<ScrollableTableProps> = ({
  headers,
  data,
  renderRow,
}) => {
  return (
    <ScrollWrapper>
      <TableContainer>
        <Table>
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>{data.map(renderRow)}</tbody>
        </Table>
      </TableContainer>
    </ScrollWrapper>
  );
};

export default ScrollableTable;
