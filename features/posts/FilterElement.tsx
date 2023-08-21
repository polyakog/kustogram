import styled from "styled-components";
import Canvas from "./Canvas";
import { useState } from "react";
import Image from "next/image";

/// //  Элемент, отображающий изображение с наложенным фильтром   /// //

const FilterElement = ({
  key,
  photoUrl,
  filterTitle,
  filter,
  handleFilter
}: {
  key: number;
  photoUrl: string;
  filterTitle: string;
  filter: string;
  handleFilter: (filterTitle: string) => void;
}) => {
  const handleFilterChose = () => {
    handleFilter(filter);
  };

  return (
    <StyledModalBody onClick={handleFilterChose}>
      <Image
        src={photoUrl}
        width={108}
        height={108}
        alt="nolmal"
        style={{ objectFit: "contain", filter: filter }}
      />
      <StyledFilterTitle>{filterTitle}</StyledFilterTitle>
    </StyledModalBody>
  );
};

export default FilterElement;

const StyledModalBody = styled.div`
  display: flex;
  flex-direction: column;

  padding: 10px;
  margin: auto;
`;

const StyledFilterTitle = styled.div`
  width: 100%;
  max-width: 160px;
  text-align: center;
`;
