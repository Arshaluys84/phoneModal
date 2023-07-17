export const formatPhone = (phone: string): string => {
    const areaCodeLength = 3;
    if (phone.length <= areaCodeLength) {
      return phone;
    } else if (phone.length > areaCodeLength && phone.length <= areaCodeLength + 3) {
      return `${phone.slice(0, areaCodeLength)}-${phone.slice(areaCodeLength)}`;
    } else if (phone.length > areaCodeLength + 3 && phone.length <= areaCodeLength + 6) {
      return `${phone.slice(0, areaCodeLength)}-${phone.slice(areaCodeLength, areaCodeLength + 3)}-${phone.slice(areaCodeLength + 3)}`;
    } else {
      return `${phone.slice(0, areaCodeLength)}-${phone.slice(areaCodeLength, areaCodeLength + 3)}-${phone.slice(areaCodeLength + 3, areaCodeLength + 6)}`;
    }
  };

  export const containsText = (text: string, searchText: string) =>
  text.toLowerCase().includes(searchText.toLowerCase());