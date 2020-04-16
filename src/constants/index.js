export const API_KEY = 'b339d001c6cdf96102c767f3fdf14d12';

const getRandomColor = () => {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const prepareGraphData = (groupData, dataProp, labelProp) => {
  const data = groupData.map(arg => arg[dataProp]);
  const labels = groupData.map(arg => arg[labelProp]);
  const colorCodes = [];
  data.map(arg => colorCodes.push(getRandomColor())); // generates color codes for all data
  
  const graphData = {
    datasets: [{
      data: [...data],
      backgroundColor: [...colorCodes],
      label: 'My dataset'
    }],
    labels
  }
  console.log(graphData)
  // colorCodes.map(() => getRandomColor());
  return Object.assign({}, graphData);
};


export const find10LargestNo = (data, param) => {
  var tenLargeArr = [];
  var currentMaxArr = [];
  

var i = 0;
while(i < 9) {
  var maxNo = Math.max(...data.map(arg => arg[param]));// gets 1 obj's with max likes/cmts
  currentMaxArr = data.filter(arg => arg[param] == maxNo); // filter obj's with max likes/cmts
  data = removeObjsFromArr(currentMaxArr, Object.assign([],data));// removes filtered obj's from main data
  tenLargeArr.push(...currentMaxArr)
  i = tenLargeArr.length > 9 ? tenLargeArr.length : i + 1; // sets index based on filtered max arr
}
tenLargeArr = tenLargeArr.sort((a,b) => b[param] - a[[param]]).slice(0,10);
var remain = removeObjsFromArr(tenLargeArr, Object.assign([],data))
remain[0][param] = remain.map(arg => arg[param]).reduce((a,b) => Number(a) + Number(b)) // sums all array numbers
remain[0]['title'] = 'Others' // sums all array numbers
tenLargeArr.push(remain[0]); // push sumed obj as 10'th array
return tenLargeArr;
}

const removeObjsFromArr = (remArr,mainArr) => {
  var remIds = remArr.map(arg => arg.id);
  return mainArr.filter(arg=> !remIds.includes(arg.id));
}

export const reduceDesc = desc => desc.slice(0,50).concat('...');
