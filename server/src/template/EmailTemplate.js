const EmailTemplate = (token) => {
  return `
    <!doctype html>
    <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    
    <head>
      <title> Welcome to Cloths Cloud </title>
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style type="text/css">
        #outlook a {
          padding: 0;
        }
    
        body {
          margin: 0;
          padding: 0;
          -webkit-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
        }
    
        table,
        td {
          border-collapse: collapse;
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
        }
    
        img {
          border: 0;
          height: auto;
          line-height: 100%;
          outline: none;
          text-decoration: none;
          -ms-interpolation-mode: bicubic;
        }
    
        p {
          display: block;
          margin: 13px 0;
        }
      <link href="https://fonts.googleapis.com/css2?family=Quattrocento:wght@400;700&display=swap" rel="stylesheet" type="text/css">
    
      <style type="text/css">
        @media only screen and (min-width:480px) {
          .mj-column-per-100 {
            width: 100% !important;
            max-width: 100%;
          }
        }
      </style>
      <style type="text/css">
        @media only screen and (max-width:480px) {
          table.mj-full-width-mobile {
            width: 100% !important;
          }
    
          td.mj-full-width-mobile {
            width: auto !important;
          }
        }
      </style>
      <style type="text/css">
        a,
        span,
        td,
        th {
          -webkit-font-smoothing: antialiased !important;
          -moz-osx-font-smoothing: grayscale !important;
        }
      </style>
    </head>
    
    <body style="background-color:#1976b1;">
      <div style="display:none;font-size:1px;color:#ffffff;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">  Welcome to Cloths Cloud </div>
      <div style="background-color:#1976b1;">
        <div style="margin:0px auto;max-width:600px;">
          <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
            <tbody>
              <tr>
                <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:0px;text-align:center;">
                </td>
              </tr>
            </tbody>
          </table>
        </div>
          
          <table
             align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
          >
            <tr>
              <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
        <div style="margin:0px auto;max-width:600px;">
          <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
            <tbody>
              <tr>
                <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
                
                  <div style="background:#ffffff;background-color:#ffffff;margin:0px auto;border-radius:8px;max-width:600px;">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;border-radius:8px;">
                      <tbody>
                        <tr>
                          <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
                            
                            <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:middle;width:100%;">
                              <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:middle;" width="100%">
                                <tr>
                                  <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                      <tbody>
                                        <tr>
                                          <td style="width:150px;">
                                            <img alt="Logo" height="auto" src="https://drive.google.com/uc?export=view&id=1V2zUYCWfpHJBdGlV8gciKkfiXjUMcYUS" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:14px;" width="150">
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                    <p style="border-top:solid 4px #f9f9f9;font-size:1px;margin:0px auto;width:100%;">
                                    </p>
                                    
                                  </td>
                                </tr>
                              </table>
                            </div>
                            
                            <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                              <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">                  
                                <tr>
                                  <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                    <div style="font-family:Quattrocento;font-size:18px;font-weight:400;line-height:24px;text-align:left;color:#000000;">
                                      <h1 style="margin: 0; font-size: 32px; line-height: 40px; font-weight: 700;">Welcome to Cloths Cloud!</h1>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                    <div style="font-family:Quattrocento;font-size:18px;font-weight:400;line-height:24px;text-align:left;color:#000000;">You're almost ready to get going, we just need to verify your email before starting. <a href="${process.env.CLIENT_URL}/verify-token/${token}" style="color: #428dfc; text-decoration: none; font-weight: bold;">Visit this link</a> in your browser to confirm your address.</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                    <div style="font-family:Quattrocento;font-size:18px;font-weight:400;line-height:24px;text-align:left;color:#000000;">Or click on the button below to complete your registration and get started!</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td align="center" vertical-align="middle" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">
                                      <tr>
                                        <td align="center" bgcolor="#428dfc" role="presentation" style="border:none;border-radius:3px;cursor:auto;mso-padding-alt:10px 25px;background:#428dfc;" valign="middle">
                                          <a href="${process.env.CLIENT_URL}/verify-token/${token}" style="display: inline-block; background: #428dfc; color: #ffffff; font-family: Quattrocento; font-size: 14px; font-weight: bold; line-height: 30px; margin: 0; text-decoration: none; text-transform: uppercase; padding: 10px 25px; mso-padding-alt: 0px; border-radius: 3px;" target="_blank"> Complete registration </a>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                    <div style="font-family:Quattrocento;font-size:16px;font-weight:400;line-height:24px;text-align:center;color:#333333;">Have questions or need help? Email us at <a href="#" style="color: #428dfc; text-decoration: none; font-weight: bold;"> clothscloud@gmail.com </a></div>
                                  </td>
                                </tr>
                              </table>
                            </div>
                            
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  
                  
                  <div style="margin:0px auto;max-width:600px;">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                      <tbody>
                        <tr>
                          <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
                            
                            <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                              <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                <tr>
                                  <td style="font-size:0px;word-break:break-word;">
                                    
                                    <div style="height:1px;"> &nbsp; </div>
                                    
                                  </td>
                                </tr>
                              </table>
                            </div>
                           
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </body>
    
    </html>`;
};

module.exports = EmailTemplate;
