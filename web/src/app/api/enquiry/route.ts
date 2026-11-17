import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { sanityWriteClient } from '@/lib/sanityWrite'

export const runtime = 'nodejs'

type EnquiryBody = {
  fullName?: string
  companyName?: string
  email?: string
  phone?: string
  productInterest?: string
  message?: string
}

function clean(value?: string) {
  return typeof value === 'string' ? value.trim() : ''
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as EnquiryBody

    const fullName = clean(body.fullName)
    const companyName = clean(body.companyName)
    const email = clean(body.email)
    const phone = clean(body.phone)
    const productInterest = clean(body.productInterest)
    const message = clean(body.message)

    if (!fullName || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          message: 'Please fill all required fields.',
        },
        {
          status: 400,
        }
      )
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Please enter a valid email address.',
        },
        {
          status: 400,
        }
      )
    }

    const smtpHost = process.env.SMTP_HOST
    const smtpPort = Number(process.env.SMTP_PORT || '465')
    const smtpUser = process.env.SMTP_USER
    const smtpPass = process.env.SMTP_PASS
    const smtpFrom = process.env.SMTP_FROM
    const smtpTo = process.env.SMTP_TO

    if (
      !smtpHost ||
      !smtpUser ||
      !smtpPass ||
      !smtpFrom ||
      !smtpTo
    ) {
      console.error('Missing SMTP environment variables.')

      return NextResponse.json(
        {
          success: false,
          message:
            'Email service is not configured correctly. Please try again later.',
        },
        {
          status: 500,
        }
      )
    }

    /*
      ---------------------------------------------------------
      1. SAVE ENQUIRY TO SANITY
      ---------------------------------------------------------
    */

    await sanityWriteClient.create({
      _type: 'enquiry',
      fullName,
      companyName,
      email,
      phone,
      productInterest,
      message,
      createdAt: new Date().toISOString(),
    })

    /*
      ---------------------------------------------------------
      2. CREATE HOSTINGER SMTP TRANSPORT
      ---------------------------------------------------------
    */

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,

      /*
        Hostinger port 465 = SSL/TLS.
      */
      secure: smtpPort === 465,

      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    })

    /*
      ---------------------------------------------------------
      3. SAFE VALUES FOR HTML EMAIL
      ---------------------------------------------------------
    */

    const safeFullName = escapeHtml(fullName)

    const safeCompanyName = companyName
      ? escapeHtml(companyName)
      : 'Not provided'

    const safeEmail = escapeHtml(email)

    const safePhone = phone
      ? escapeHtml(phone)
      : 'Not provided'

    const safeProductInterest = productInterest
      ? escapeHtml(productInterest)
      : 'General Enquiry'

    const safeMessage = escapeHtml(message).replaceAll(
      '\n',
      '<br />'
    )

    /*
      ---------------------------------------------------------
      4. SEND EMAIL TO VENZURA INBOX
      ---------------------------------------------------------
    */

    await transporter.sendMail({
      /*
        IMPORTANT:
        Customer email ko "from" me use nahi karna.
        Authenticated company email hi From rahega.
      */
      from: `"Venzura Medcor Website" <${smtpFrom}>`,

      /*
        Enquiry yahan receive hogi.
      */
      to: smtpTo,

      /*
        Inbox me Reply click karoge to reply
        visitor/customer ke email par jayega.
      */
      replyTo: {
        name: fullName,
        address: email,
      },

      subject: productInterest
        ? `New Website Enquiry - ${productInterest}`
        : `New Website Enquiry - ${fullName}`,

      text: `
NEW WEBSITE ENQUIRY
Venzura Medcor

Name: ${fullName}
Company: ${companyName || 'Not provided'}
Email: ${email}
Phone: ${phone || 'Not provided'}
Product Interest: ${productInterest || 'General Enquiry'}

Message:
${message}

--------------------------------------------------
Submitted through:
https://www.venzuramedcor.com
      `.trim(),

      html: `
        <!doctype html>
        <html>
          <head>
            <meta charset="utf-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
          </head>

          <body
            style="
              margin:0;
              padding:0;
              background:#f4f7fb;
              font-family:Arial,Helvetica,sans-serif;
              color:#16324f;
            "
          >
            <table
              role="presentation"
              width="100%"
              cellspacing="0"
              cellpadding="0"
              border="0"
              style="
                width:100%;
                background:#f4f7fb;
                padding:32px 14px;
              "
            >
              <tr>
                <td align="center">

                  <table
                    role="presentation"
                    width="100%"
                    cellspacing="0"
                    cellpadding="0"
                    border="0"
                    style="
                      width:100%;
                      max-width:680px;
                      background:#ffffff;
                      border-radius:20px;
                      overflow:hidden;
                      box-shadow:0 10px 35px rgba(11,63,112,0.10);
                    "
                  >

                    <tr>
                      <td
                        style="
                          padding:28px 32px;
                          background:
                            linear-gradient(
                              135deg,
                              #0b3f70,
                              #1f6fd1
                            );
                          color:#ffffff;
                        "
                      >
                        <div
                          style="
                            font-size:12px;
                            font-weight:700;
                            text-transform:uppercase;
                            letter-spacing:2px;
                            opacity:0.8;
                          "
                        >
                          Venzura Medcor
                        </div>

                        <div
                          style="
                            margin-top:8px;
                            font-size:26px;
                            line-height:1.25;
                            font-weight:800;
                          "
                        >
                          New Website Enquiry
                        </div>

                        <div
                          style="
                            margin-top:7px;
                            font-size:14px;
                            line-height:1.6;
                            opacity:0.86;
                          "
                        >
                          A new requirement has been submitted
                          through venzuramedcor.com
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td style="padding:30px 32px">

                        <table
                          role="presentation"
                          width="100%"
                          cellspacing="0"
                          cellpadding="0"
                          border="0"
                        >

                          <tr>
                            <td
                              style="
                                padding:12px 0;
                                border-bottom:1px solid #e7edf4;
                              "
                            >
                              <div
                                style="
                                  font-size:11px;
                                  text-transform:uppercase;
                                  letter-spacing:1.3px;
                                  color:#71869a;
                                  font-weight:700;
                                "
                              >
                                Full Name
                              </div>

                              <div
                                style="
                                  margin-top:5px;
                                  font-size:16px;
                                  font-weight:700;
                                  color:#0b3f70;
                                "
                              >
                                ${safeFullName}
                              </div>
                            </td>
                          </tr>

                          <tr>
                            <td
                              style="
                                padding:12px 0;
                                border-bottom:1px solid #e7edf4;
                              "
                            >
                              <div
                                style="
                                  font-size:11px;
                                  text-transform:uppercase;
                                  letter-spacing:1.3px;
                                  color:#71869a;
                                  font-weight:700;
                                "
                              >
                                Company
                              </div>

                              <div
                                style="
                                  margin-top:5px;
                                  font-size:15px;
                                  color:#294b6b;
                                "
                              >
                                ${safeCompanyName}
                              </div>
                            </td>
                          </tr>

                          <tr>
                            <td
                              style="
                                padding:12px 0;
                                border-bottom:1px solid #e7edf4;
                              "
                            >
                              <div
                                style="
                                  font-size:11px;
                                  text-transform:uppercase;
                                  letter-spacing:1.3px;
                                  color:#71869a;
                                  font-weight:700;
                                "
                              >
                                Email
                              </div>

                              <div
                                style="
                                  margin-top:5px;
                                  font-size:15px;
                                "
                              >
                                <a
                                  href="mailto:${safeEmail}"
                                  style="
                                    color:#1f6fd1;
                                    text-decoration:none;
                                    font-weight:700;
                                  "
                                >
                                  ${safeEmail}
                                </a>
                              </div>
                            </td>
                          </tr>

                          <tr>
                            <td
                              style="
                                padding:12px 0;
                                border-bottom:1px solid #e7edf4;
                              "
                            >
                              <div
                                style="
                                  font-size:11px;
                                  text-transform:uppercase;
                                  letter-spacing:1.3px;
                                  color:#71869a;
                                  font-weight:700;
                                "
                              >
                                Phone
                              </div>

                              <div
                                style="
                                  margin-top:5px;
                                  font-size:15px;
                                  color:#294b6b;
                                "
                              >
                                ${safePhone}
                              </div>
                            </td>
                          </tr>

                          <tr>
                            <td
                              style="
                                padding:12px 0;
                                border-bottom:1px solid #e7edf4;
                              "
                            >
                              <div
                                style="
                                  font-size:11px;
                                  text-transform:uppercase;
                                  letter-spacing:1.3px;
                                  color:#71869a;
                                  font-weight:700;
                                "
                              >
                                Product Interest
                              </div>

                              <div
                                style="
                                  margin-top:5px;
                                  font-size:15px;
                                  font-weight:700;
                                  color:#0b3f70;
                                "
                              >
                                ${safeProductInterest}
                              </div>
                            </td>
                          </tr>

                        </table>

                        <div
                          style="
                            margin-top:24px;
                            padding:20px;
                            border-radius:14px;
                            background:#f4f8fd;
                            border:1px solid #dce9f7;
                          "
                        >
                          <div
                            style="
                              font-size:11px;
                              text-transform:uppercase;
                              letter-spacing:1.3px;
                              color:#71869a;
                              font-weight:700;
                            "
                          >
                            Customer Message
                          </div>

                          <div
                            style="
                              margin-top:10px;
                              font-size:15px;
                              line-height:1.8;
                              color:#294b6b;
                            "
                          >
                            ${safeMessage}
                          </div>
                        </div>

                        <div
                          style="
                            margin-top:26px;
                            padding-top:20px;
                            border-top:1px solid #e7edf4;
                            font-size:13px;
                            line-height:1.7;
                            color:#71869a;
                          "
                        >
                          Click <strong>Reply</strong> in your
                          email client to respond directly to
                          ${safeFullName}.
                        </div>

                      </td>
                    </tr>

                  </table>

                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    })

    return NextResponse.json({
      success: true,
      message: 'Enquiry submitted successfully.',
    })
  } catch (error) {
    console.error('Enquiry submission error:', error)

    return NextResponse.json(
      {
        success: false,
        message:
          'Something went wrong. Please try again.',
      },
      {
        status: 500,
      }
    )
  }
}