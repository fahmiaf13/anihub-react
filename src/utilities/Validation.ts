export const isValidGroupName = (groupName: string) => {
  // Validasi bahwa nama grup tidak boleh kosong dan tidak mengandung karakter khusus
  const pattern = /^[a-zA-Z0-9\s]+$/;
  return groupName.trim() !== "" && pattern.test(groupName);
};
