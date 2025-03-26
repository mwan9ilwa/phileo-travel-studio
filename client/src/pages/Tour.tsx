import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { useEffect, useState } from "react";
import { Star, StarHalf, Calendar, Users, Clock, Check, X, MapPin, ChevronRight } from "lucide-react";
import type { Review } from "@/lib/types";

const Tour = () => {
  const { slug } = useParams();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const { data: tourData, isLoading: isLoadingTour, isError: isErrorTour } = 
    useQuery({
      queryKey: [`/api/tours/${slug}`],
      staleTime: 60000, // 1 minute
    });
  
  const { data: reviewsData, isLoading: isLoadingReviews } = 
    useQuery({
      queryKey: [`/api/tours/${tourData?.tour?.id}/reviews`],
      staleTime: 60000, // 1 minute
      enabled: !!tourData?.tour?.id,
    });

  useEffect(() => {
    if (tourData?.tour) {
      document.title = `${tourData.tour.title} | Voyageur`;
      setSelectedImage(tourData.tour.image);
    }
  }, [tourData]);

  if (isLoadingTour) {
    return (
      <main className="py-8">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-neutral-light rounded w-1/4 mb-4"></div>
            <div className="h-96 bg-neutral-light rounded mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="col-span-2">
                <div className="h-8 bg-neutral-light rounded w-1/3 mb-4"></div>
                <div className="h-4 bg-neutral-light rounded w-full mb-2"></div>
                <div className="h-4 bg-neutral-light rounded w-full mb-2"></div>
                <div className="h-4 bg-neutral-light rounded w-3/4 mb-8"></div>
                
                <div className="h-8 bg-neutral-light rounded w-1/4 mb-4"></div>
                <div className="h-20 bg-neutral-light rounded mb-8"></div>
                
                <div className="h-8 bg-neutral-light rounded w-1/4 mb-4"></div>
                <div className="h-40 bg-neutral-light rounded mb-8"></div>
              </div>
              <div className="lg:col-span-1">
                <div className="h-96 bg-neutral-light rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (isErrorTour || !tourData?.tour) {
    return (
      <main className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">Tour Not Found</h1>
          <p className="mb-8">Sorry, we couldn't find the tour you're looking for.</p>
          <Link href="/tours" className="btn-primary">
            Browse All Tours
          </Link>
        </div>
      </main>
    );
  }

  const { tour } = tourData;
  const itineraryDays = Object.entries(tour.itinerary);

  return (
    <main>
      {/* Tour Gallery */}
      <section className="relative pb-8 pt-8">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold font-playfair mb-2">{tour.title}</h1>
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 text-primary mr-1" />
                <Link href={`/destinations?destination=${tour.destinationId}`} className="text-neutral-medium hover:text-primary">
                  {tour.destinationName}
                </Link>
              </div>
              <span className="text-neutral-light">|</span>
              <div className="flex items-center">
                <div className="text-yellow-400 flex">
                  {[...Array(Math.floor(tour.rating))].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                  {tour.rating % 1 >= 0.5 && <StarHalf className="h-4 w-4 fill-current" />}
                </div>
                <span className="ml-1 text-neutral-medium">{tour.rating.toFixed(1)} ({tour.reviewCount} reviews)</span>
              </div>
              {tour.tag && (
                <>
                  <span className="text-neutral-light">|</span>
                  <span className="bg-secondary text-white text-xs px-2 py-1 rounded">
                    {tour.tag}
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-8">
              <div className="relative rounded-lg overflow-hidden h-[400px] md:h-[500px]">
                <img
                  src={selectedImage || tour.image}
                  alt={tour.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="md:col-span-4">
              <div className="grid grid-cols-2 gap-4 h-full">
                {tour.gallery.slice(0, 4).map((image, index) => (
                  <div 
                    key={index} 
                    className={`rounded-lg overflow-hidden h-[190px] md:h-[242px] cursor-pointer ${selectedImage === image ? 'ring-4 ring-primary' : ''}`}
                    onClick={() => setSelectedImage(image)}
                  >
                    <img
                      src={image}
                      alt={`${tour.title} gallery image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Tour Description */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-bold font-playfair mb-4">Tour Overview</h2>
                <p className="text-neutral-medium mb-6">{tour.description}</p>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  <div className="text-center border border-neutral-light rounded-lg p-4">
                    <Clock className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <p className="text-sm text-neutral-medium">Duration</p>
                    <p className="font-bold">{tour.duration} Days</p>
                  </div>
                  <div className="text-center border border-neutral-light rounded-lg p-4">
                    <Users className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <p className="text-sm text-neutral-medium">Group Size</p>
                    <p className="font-bold">Max {tour.groupSize}</p>
                  </div>
                  <div className="text-center border border-neutral-light rounded-lg p-4">
                    <svg className="h-6 w-6 mx-auto mb-2 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
                    </svg>
                    <p className="text-sm text-neutral-medium">Difficulty</p>
                    <p className="font-bold">{tour.difficulty}</p>
                  </div>
                  <div className="text-center border border-neutral-light rounded-lg p-4">
                    <Calendar className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <p className="text-sm text-neutral-medium">Departures</p>
                    <p className="font-bold">{tour.departureDates.length} Dates</p>
                  </div>
                </div>
              </div>

              {/* Tour Highlights */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-bold font-playfair mb-4">Tour Highlights</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {tour.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start">
                      <div className="bg-primary/10 rounded-full p-1 mr-3 mt-1">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                      <p className="text-neutral-medium">{highlight}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tour Itinerary */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-bold font-playfair mb-4">Itinerary</h2>
                <div className="space-y-4">
                  {itineraryDays.map(([day, description], index) => (
                    <div key={day} className="border-b border-neutral-light last:border-b-0 pb-4 last:pb-0">
                      <h3 className="font-bold text-lg mb-2">Day {index + 1}: {day.replace('day' + (index + 1), '').trim()}</h3>
                      <p className="text-neutral-medium">{description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Included / Excluded */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-bold font-playfair mb-4">What's Included</h2>
                  <ul className="space-y-2">
                    {tour.included.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-success mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-neutral-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-bold font-playfair mb-4">What's Not Included</h2>
                  <ul className="space-y-2">
                    {tour.excluded.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <X className="h-5 w-5 text-danger mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-neutral-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Reviews */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-bold font-playfair mb-6">Reviews</h2>
                
                {isLoadingReviews ? (
                  <div className="space-y-6">
                    {[...Array(2)].map((_, index) => (
                      <div key={index} className="border-b border-neutral-light last:border-b-0 pb-6 last:pb-0 animate-pulse">
                        <div className="flex items-center mb-4">
                          <div className="w-12 h-12 bg-neutral-light rounded-full mr-4"></div>
                          <div>
                            <div className="h-4 bg-neutral-light rounded w-24 mb-2"></div>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <div key={i} className="h-4 w-4 bg-neutral-light rounded-full mr-1"></div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="h-4 bg-neutral-light rounded w-full mb-2"></div>
                        <div className="h-4 bg-neutral-light rounded w-full mb-2"></div>
                        <div className="h-4 bg-neutral-light rounded w-3/4"></div>
                      </div>
                    ))}
                  </div>
                ) : reviewsData?.reviews && reviewsData.reviews.length > 0 ? (
                  <div className="space-y-6">
                    {reviewsData.reviews.map((review: Review) => (
                      <div key={review.id} className="border-b border-neutral-light last:border-b-0 pb-6 last:pb-0">
                        <div className="flex items-center mb-4">
                          <img src={review.authorImage} alt={review.author} className="w-12 h-12 rounded-full mr-4" />
                          <div>
                            <h4 className="font-bold">{review.author}</h4>
                            <div className="text-yellow-400 flex">
                              {[...Array(Math.floor(review.rating))].map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-current" />
                              ))}
                              {review.rating % 1 >= 0.5 && <StarHalf className="h-4 w-4 fill-current" />}
                            </div>
                          </div>
                        </div>
                        <p className="text-neutral-medium">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-neutral-medium">No reviews yet for this tour.</p>
                )}
              </div>
            </div>

            {/* Booking Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <div className="mb-4">
                  <span className="text-3xl font-bold text-primary">${tour.price.toFixed(0)}</span>
                  <span className="text-neutral-medium ml-2">per person</span>
                </div>

                <div className="mb-6">
                  <h3 className="font-bold mb-2">Departure Dates</h3>
                  <div className="space-y-2">
                    {tour.departureDates.map((date, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border border-neutral-light rounded-md hover:border-primary cursor-pointer transition">
                        <div className="flex items-center">
                          <Calendar className="h-5 w-5 text-primary mr-2" />
                          <span>{new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                        <span className="text-primary font-medium">Available</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="travelers" className="block font-bold mb-2">Number of Travelers</label>
                  <select 
                    id="travelers" 
                    className="w-full border border-neutral-light rounded-md p-3"
                  >
                    {[...Array(tour.groupSize)].map((_, i) => (
                      <option key={i} value={i + 1}>{i + 1} {i === 0 ? 'Traveler' : 'Travelers'}</option>
                    ))}
                  </select>
                </div>

                <button 
                  onClick={() => {
                    const subject = `Booking Request: ${tour.title}`;
                    const body = `Hi, I'm interested in booking the "${tour.title}" tour for ${
                      document.getElementById('travelers')?.value || '1'
                    } traveler(s).`;
                    window.location.href = `mailto:bookings@youragency.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                  }}
                  className="w-full bg-primary text-white py-3 rounded-md hover:bg-primary-dark transition font-medium mb-4"
                >
                  Book via Email
                </button>
                
                <a 
                  href={`https://wa.me/1234567890?text=${encodeURIComponent(
                    `Hi, I'm interested in booking the "${tour.title}" tour`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full border border-primary text-primary hover:bg-primary hover:text-white py-3 rounded-md transition font-medium text-center"
                >
                  Book via WhatsApp
                </a>

                <div className="border-t border-neutral-light mt-6 pt-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-primary/10 rounded-full p-2 mr-3">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                        <path d="M2 9v4a2 2 0 0 0 2 2h15a2 2 0 0 0 2-2V9"/>
                        <path d="M16 18v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold">Flexible Booking</h4>
                      <p className="text-sm text-neutral-medium">Free cancellation up to 30 days before departure</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-primary/10 rounded-full p-2 mr-3">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="m9 12 2 2 4-4"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold">Secure Payments</h4>
                      <p className="text-sm text-neutral-medium">All payments are secured and encrypted</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Tours */}
      <section className="py-12 bg-neutral-lightest">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold font-playfair mb-2">You Might Also Like</h2>
              <p className="text-neutral-medium">Similar tours you may be interested in</p>
            </div>
            <Link href="/tours" className="inline-flex items-center mt-4 md:mt-0 text-primary font-medium">
              View all tours <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          {/* This would typically fetch related tours, but for this demo we'll leave it empty */}
          <div className="text-center py-8">
            <p className="text-neutral-medium mb-4">Looking for more tour options?</p>
            <Link href="/tours" className="btn-primary">Explore All Tours</Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Tour;
