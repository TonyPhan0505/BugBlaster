export default function AddPeriod(data) {
    let formattedData = data;
    if (formattedData[formattedData.length - 1] !== ".") {
      formattedData = formattedData + ".";
    }
    return formattedData;
}