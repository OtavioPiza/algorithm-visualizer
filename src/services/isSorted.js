/**
 * Returns if an array of bars is sorted or not
 * 
 * @param {Array} list array of bars
 */
const isSorted = (list) => {
  let sorted = 1

  for (let i = 1; i < list.length; i++) {

    if (list[i].size < list[i - 1].size) {
      sorted = 0
      break
    }
  }
  if (sorted !== 1) {
    sorted = -1

    for (let i = 1; i < list.length; i++) {

      if (list[i].size > list[i - 1].size) {
        sorted = 0
        break
      }
    }
  }
  return sorted
}

export default isSorted