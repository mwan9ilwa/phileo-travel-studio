import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Check,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phoneNumber: z.string().min(10, { message: "Please enter a valid phone number." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  departureCity: z.string().min(2, { message: "Departure city is required." }),
  arrivalCity: z.string().min(2, { message: "Arrival city is required." }),
  departureDate: z.date({ required_error: "Departure date is required." }),
  returnDate: z.date({ required_error: "Return date is required." }),
  passengers: z.string().min(1, { message: "Number of passengers is required." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactUs() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      subject: "",
      departureCity: "",
      arrivalCity: "",
      passengers: "",
      message: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);

    try {
      // Format dates properly
      const formDataToSend = {
        ...values,
        departureDate: values.departureDate instanceof Date ? values.departureDate.toISOString() : values.departureDate,
        returnDate: values.returnDate instanceof Date ? values.returnDate.toISOString() : values.returnDate,
      };

      // Send to Formspree
      const response = await fetch("https://formspree.io/f/myzengod", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataToSend),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setIsSubmitted(true);
      toast({
        title: "Inquiry Received",
        description: "We've received your travel inquiry and will get back to you soon.",
      });
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "There was a problem sending your inquiry. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container mx-auto py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold">Contact Us</h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600">
          Have questions or need assistance? We're here to help! Reach out to
          our team and we'll get back to you as soon as possible.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <h2 className="mb-6 text-2xl font-bold">Send Us a Message</h2>
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <Check className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">
                    Message Sent Successfully!
                  </h3>
                  <p className="mb-6 text-gray-600">
                    Thank you for reaching out. We've received your travel inquiry and
                    will get back to you as soon as possible.
                  </p>
                  <Button
                    onClick={() => setIsSubmitted(false)}
                    variant="outline"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <h3 className="text-lg font-semibold">Personal Information</h3>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="john.doe@example.com"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="+260 123456789" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Travel Inquiry"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <h3 className="text-lg font-semibold pt-2">Travel Details</h3>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="departureCity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City of Departure</FormLabel>
                            <FormControl>
                              <Input placeholder="Lusaka" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="arrivalCity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City of Arrival</FormLabel>
                            <FormControl>
                              <Input placeholder="Cape Town" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="departureDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Departure Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-full pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date < new Date(new Date().setHours(0, 0, 0, 0))
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="returnDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Return Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-full pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date < (form.getValues().departureDate || new Date(new Date().setHours(0, 0, 0, 0)))
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="passengers"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number of Passengers</FormLabel>
                          <FormControl>
                            <Input type="number" min="1" placeholder="2" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Additional Information</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Please provide any additional details about your travel plans..."
                              className="min-h-[150px]"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Include any special requirements or questions you may have.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <svg
                            className="mr-2 h-4 w-4 animate-spin"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <Send className="mr-2 h-4 w-4" /> Send Inquiry
                        </span>
                      )}
                    </Button>
                  </form>
                </Form>
              )}
            </CardContent>
          </Card>
        </div>

        {/* ... rest of the component remains unchanged ... */}

        {/* Contact Information */}
        <div>
          <Card className="mb-6">
            <CardContent className="p-6">
              <h2 className="mb-6 text-2xl font-bold">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="mr-3 h-5 w-5 text-primary" />
                  <div>
                    <h3 className="text-sm font-semibold">Address</h3>
                    <p className="text-gray-600">
                      Plot Number 17, Nangwenya Road <br />
                      Rhodes Park, Lusaka
                      <br />
                      Zambia
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="mr-3 h-5 w-5 text-primary" />
                  <div>
                    <h3 className="text-sm font-semibold">Phone</h3>
                    <p className="text-gray-600">
                      <a href="tel:+260970629899" className="hover:underline">
                        +260 (970) 629899
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="mr-3 h-5 w-5 text-primary" />
                  <div>
                    <h3 className="text-sm font-semibold">Email</h3>
                    <p className="text-gray-600">
                      <a
                        href="mailto:phileo.travelstudio@gmail.com"
                        className="hover:underline"
                      >
                        phileo.travelstudio@gmail.com
                      </a>
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="mr-3 h-5 w-5 text-primary" />
                  <div>
                    <h3 className="text-sm font-semibold">Hours</h3>
                    <p className="text-gray-600">
                      Monday - Friday: 8am - 5pm
                      <br />
                      Saturday: 9am - 12pm
                      <br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="mb-3 text-sm font-semibold">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-600 hover:text-primary">
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-600 hover:text-primary">
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-600 hover:text-primary">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-600 hover:text-primary">
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* <Card>
            <CardContent className="p-6">
              <h2 className="mb-4 text-2xl font-bold">FAQ</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-semibold">
                    How do I book a tour?
                  </h3>
                  <p className="text-sm text-gray-600">
                    You can book a tour directly through our website by
                    selecting your desired tour and following the booking
                    process.
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-semibold">
                    What is your cancellation policy?
                  </h3>
                  <p className="text-sm text-gray-600">
                    Our standard policy allows cancellations up to 14 days
                    before the tour for a full refund.
                  </p>
                </div>
                <div>
                  <h3 className="text-base font-semibold">
                    Do you offer group discounts?
                  </h3>
                  <p className="text-sm text-gray-600">
                    Yes, we offer special rates for groups of 8 or more. Contact
                    us for details.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card> */}
        </div>
      </div>

      {/* Map Section */}
      <div className="mt-12">
        <div className="rounded-lg overflow-hidden h-[400px] w-full bg-gray-200 flex items-center justify-center">
          <div className="text-center p-8">
            <h3 className="text-xl font-semibold mb-2">
              Interactive Map Coming Soon
            </h3>
            <p className="text-gray-600">
              Our office is conveniently located in downtown San Francisco,
              close to public transportation and major attractions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
