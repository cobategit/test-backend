export let generateKode = function (
  data: any,
  uniqDepan: string
): Promise<string> {
  let kode_user: string = ''
  if (data.length > 0) {
    let i = parseInt(data[0].kode_user) + 1
    if (i >= 0 && i <= 9) {
      kode_user = `${uniqDepan}` + '00000000' + i
    } else if (i >= 10 && i <= 99) {
      kode_user = `${uniqDepan}` + '0000000' + i
    } else if (i >= 100 && i <= 999) {
      kode_user = `${uniqDepan}` + '000000' + i
    } else if (i >= 1000 && i <= 9999) {
      kode_user = `${uniqDepan}` + '00000' + i
    } else if (i >= 10000 && i <= 99999) {
      kode_user = `${uniqDepan}` + '0000' + i
    } else if (i >= 100000 && i <= 999999) {
      kode_user = `${uniqDepan}` + '000' + i
    } else if (i >= 1000000 && i <= 9999999) {
      kode_user = `${uniqDepan}` + '00' + i
    } else if (i >= 10000000 && i <= 99999999) {
      kode_user = `${uniqDepan}` + '0' + i
    } else if (i >= 100000000 && i <= 999999999) {
      kode_user = `${uniqDepan}` + i
    }
  } else {
    kode_user = `${uniqDepan}` + `000000001`
  }

  return new Promise<string>((resolve) => {
    resolve(kode_user)
  })
}
