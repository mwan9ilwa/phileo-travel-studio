import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import mailchimp from '@mailchimp/mailchimp_marketing';

// Initialize Mailchimp client
mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX, // e.g., "us1"
});

// Same validation schema as client-side
const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phoneNumber: z.string().min(10),
  subject: z.string().min(5),
  departureCity: z.string().min(2),
  arrivalCity: z.string().min(2),
  departureDate: z.date().or(z.string()), // Handle both date object and string
  returnDate: z.date().or(z.string()),
  passengers: z.string().min(1).or(z.number()),
  message: z.string().min(10),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow POST method
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Validate the request body
    const formData = formSchema.parse(req.body);
    
    // Format dates if they are Date objects
    const formatDate = (date: any) => {
      if (date instanceof Date) {
        return date.toISOString().split('T')[0]; // YYYY-MM-DD format
      }
      return date;
    };
    
    // Add subscriber to Mailchimp list
    const subscriberData = {
      email_address: formData.email,
      status: 'subscribed',
      merge_fields: {
        FNAME: formData.name.split(' ')[0],
        LNAME: formData.name.split(' ').slice(1).join(' ') || '',
        PHONE: formData.phoneNumber,
        DEP_CITY: formData.departureCity,
        ARR_CITY: formData.arrivalCity,
        DEP_DATE: formatDate(formData.departureDate),
        RET_DATE: formatDate(formData.returnDate),
        PASSENGRS: formData.passengers.toString(),
        SUBJECT: formData.subject,
        MESSAGE: formData.message,
      },
      tags: ['Website Inquiry', 'Travel Lead']
    };
    
    // Add to Mailchimp list
    try {
      await mailchimp.lists.addListMember(
        process.env.MAILCHIMP_AUDIENCE_ID,
        subscriberData
      );
      
      // Return success response
      return res.status(200).json({ 
        success: true, 
        message: 'Thank you! Your inquiry has been received.' 
      });
      
    } catch (mailchimpError: any) {
      console.error('Mailchimp error:', mailchimpError);
      
      // Handle the case where email already exists
      if (mailchimpError.status === 400 && 
          mailchimpError.response.body.title === 'Member Exists') {
        
        // Update the existing subscriber instead
        const subscriberHash = mailchimp.helpers.MD5(formData.email.toLowerCase());
        
        await mailchimp.lists.updateListMember(
          process.env.MAILCHIMP_AUDIENCE_ID,
          subscriberHash,
          {
            merge_fields: subscriberData.merge_fields,
            tags: subscriberData.tags
          }
        );
        
        return res.status(200).json({ 
          success: true, 
          message: 'Thank you! Your inquiry has been updated.' 
        });
      }
      
      throw mailchimpError;
    }
    
  } catch (error) {
    console.error('Error processing contact form:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Something went wrong. Please try again later.' 
    });
  }
}