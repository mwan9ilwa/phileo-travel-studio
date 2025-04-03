import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Contact } from '@/types';

interface InquiryFormProps {
  contact: Contact;
  onSuccess?: () => void;
}

interface FormData {
  fullName: string;
  email: string;
  departureDate: string;
  returnDate?: string;
  departureCity: string;
  arrivalCity: string;
  numberOfPassengers: number;
  phoneNumber?: string;
  notes?: string;
}

const InquiryForm = ({ contact, onSuccess }: InquiryFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { inquiryFormFields } = contact;
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      fullName: '',
      email: '',
      departureDate: '',
      returnDate: '',
      departureCity: '',
      arrivalCity: '',
      numberOfPassengers: 1,
      phoneNumber: '',
      notes: ''
    }
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // Here you would typically send the data to your API
      // For now we'll just simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Success!",
        description: contact.contactFormSuccessMessage,
      });
      
      reset();
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem submitting your inquiry. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">{inquiryFormFields.fullName.label} {inquiryFormFields.fullName.required && '*'}</Label>
          <Input
            id="fullName"
            type="text"
            {...register("fullName", { required: inquiryFormFields.fullName.required })}
            className={errors.fullName ? "border-red-500" : ""}
          />
          {errors.fullName && <p className="text-red-500 text-sm">This field is required</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">{inquiryFormFields.email.label} {inquiryFormFields.email.required && '*'}</Label>
          <Input
            id="email"
            type="email"
            {...register("email", { 
              required: inquiryFormFields.email.required,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })}
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && <p className="text-red-500 text-sm">
            {errors.email.message || "This field is required"}
          </p>}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="departureDate">{inquiryFormFields.departureDate.label} {inquiryFormFields.departureDate.required && '*'}</Label>
          <Input
            id="departureDate"
            type="date"
            {...register("departureDate", { required: inquiryFormFields.departureDate.required })}
            className={errors.departureDate ? "border-red-500" : ""}
          />
          {errors.departureDate && <p className="text-red-500 text-sm">This field is required</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="returnDate">{inquiryFormFields.returnDate.label} {inquiryFormFields.returnDate.required && '*'}</Label>
          <Input
            id="returnDate"
            type="date"
            {...register("returnDate", { required: inquiryFormFields.returnDate.required })}
            className={errors.returnDate ? "border-red-500" : ""}
          />
          {errors.returnDate && <p className="text-red-500 text-sm">This field is required</p>}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="departureCity">{inquiryFormFields.departureCity.label} {inquiryFormFields.departureCity.required && '*'}</Label>
          <Input
            id="departureCity"
            type="text"
            {...register("departureCity", { required: inquiryFormFields.departureCity.required })}
            className={errors.departureCity ? "border-red-500" : ""}
          />
          {errors.departureCity && <p className="text-red-500 text-sm">This field is required</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="arrivalCity">{inquiryFormFields.arrivalCity.label} {inquiryFormFields.arrivalCity.required && '*'}</Label>
          <Input
            id="arrivalCity"
            type="text"
            {...register("arrivalCity", { required: inquiryFormFields.arrivalCity.required })}
            className={errors.arrivalCity ? "border-red-500" : ""}
          />
          {errors.arrivalCity && <p className="text-red-500 text-sm">This field is required</p>}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="numberOfPassengers">{inquiryFormFields.numberOfPassengers.label} {inquiryFormFields.numberOfPassengers.required && '*'}</Label>
          <Input
            id="numberOfPassengers"
            type="number"
            min={inquiryFormFields.numberOfPassengers.min || 1}
            {...register("numberOfPassengers", { 
              required: inquiryFormFields.numberOfPassengers.required,
              min: inquiryFormFields.numberOfPassengers.min || 1,
              valueAsNumber: true
            })}
            className={errors.numberOfPassengers ? "border-red-500" : ""}
          />
          {errors.numberOfPassengers && <p className="text-red-500 text-sm">
            {errors.numberOfPassengers.type === 'min' 
              ? `Minimum value is ${inquiryFormFields.numberOfPassengers.min}`
              : "This field is required"}
          </p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phoneNumber">{inquiryFormFields.phoneNumber.label}</Label>
          <Input
            id="phoneNumber"
            type="tel"
            {...register("phoneNumber")}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="notes">Additional Notes</Label>
        <Textarea
          id="notes"
          {...register("notes")}
          placeholder="Tell us about your travel preferences, special requirements, or questions."
          rows={4}
        />
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-primary hover:bg-primary-600"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit Inquiry"}
      </Button>
    </form>
  );
};

export default InquiryForm;
