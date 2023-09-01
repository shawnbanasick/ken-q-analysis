const getRawSorts = (mainDataObject: any) => {
  const rawSorts = mainDataObject.map((respondent: any) => [
    ...respondent.rawSort,
  ]);
  return rawSorts;
};

export default getRawSorts;
