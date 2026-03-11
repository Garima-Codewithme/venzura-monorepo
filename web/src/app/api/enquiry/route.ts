import { NextResponse } from 'next/server'
import { sanityWriteClient } from '@/lib/sanityWrite'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const fullName = body.fullName?.trim()
    const companyName = body.companyName?.trim() || ''
    const email = body.email?.trim()
    const phone = body.phone?.trim() || ''
    const productInterest = body.productInterest?.trim() || ''
    const message = body.message?.trim()

    if (!fullName || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Please fill all required fields.' },
        { status: 400 }
      )
    }

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

    return NextResponse.json({
      success: true,
      message: 'Enquiry submitted successfully.',
    })
  } catch (error) {
    console.error('Enquiry submission error:', error)

    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}