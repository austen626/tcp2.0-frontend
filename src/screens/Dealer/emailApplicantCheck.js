/* eslint-disable no-lone-blocks */
export const emailApplicantCheck = async (data, callbackEvent) => {
    const emailSetCheck = {
        applicantEmailIssue: false,
        coApplicantEmailIssue: false,
    }
    await callbackEvent(data.firstEmail).then(async() => {
        emailSetCheck.applicantEmailIssue = false;
        {
            data.secondEmail && 
            await callbackEvent(data.secondEmail).then(() => {
                emailSetCheck.coApplicantEmailIssue = false;
            }).catch(() => {
                emailSetCheck.coApplicantEmailIssue = true;
            })
        }
    }).catch(() => {
        emailSetCheck.applicantEmailIssue = true;
    })
    return emailSetCheck;
}