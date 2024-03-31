function phoneVelidation(phone) {
    const phonePattern = /^(?:\+?88)?01[3-9]\d{8}$/
    return phonePattern.test(phone)
}
module.exports = phoneVelidation
