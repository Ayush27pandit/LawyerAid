import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
import { Badge } from "./components/ui/badge";
import { Card, CardContent } from "./components/ui/card";
import { Search, Star, Calendar, Phone } from "lucide-react";

const lawyers = [
  {
    name: "Sarah Johnson",
    title: "Corporate Law Specialist | Partner at Johnson & Associates",
    image: "https://via.placeholder.com/400",
    company: "Johnson & Associates",
    rating: 4.9,
  },
  {
    name: "Michael Chen",
    title: "Intellectual Property Expert | Senior Partner",
    image: "https://via.placeholder.com/400",
    company: "Legal Tech Solutions",
    rating: 4.8,
  },
  {
    name: "Emily Rodriguez",
    title: "Family Law Attorney | Certified Mediator",
    image: "https://via.placeholder.com/400",
    company: "Family First Legal",
    rating: 5.0,
  },
  {
    name: "David Thompson",
    title: "Criminal Defense Attorney | Former Prosecutor",
    image: "https://via.placeholder.com/400",
    company: "Thompson Defense",
    rating: 4.9,
  },
];

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <a href="/" className="flex items-center gap-2 font-bold text-black">
            <span className="text-2xl">LegalConnect</span>
          </a>
          <div className="flex items-center gap-4">
            <Button variant="outline">Leaderboard</Button>
            <Button>Sign Up</Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="container mx-auto px-4 py-12 text-center">
          <h1 className="mb-4 text-5xl font-bold tracking-tight text-black">
            Get Legal Help. Faster Than Ever.
          </h1>
          <p className="mb-8 text-xl text-gray-600">
            Instant access to top legal professionals from prestigious firms
          </p>

          <div className="mx-auto mb-8 flex max-w-xl items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input
                className="pl-10"
                placeholder="Search for legal experts"
                type="search"
              />
            </div>
          </div>

          <div className="mb-8 flex items-center justify-center gap-4">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <Avatar key={i} className="border-2 border-white">
                  <AvatarImage src={`https://via.placeholder.com/40`} />
                  <AvatarFallback>U{i}</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <span className="font-semibold text-black">
              Trusted by 10K+ clients
            </span>
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-black">4.9/5 Rated</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="secondary" className="cursor-pointer">
              All
            </Badge>
            <Badge variant="secondary" className="cursor-pointer">
              Available Instantly
            </Badge>
            <Badge variant="secondary" className="cursor-pointer">
              Corporate Law
            </Badge>
            <Badge variant="secondary" className="cursor-pointer">
              Family Law
            </Badge>
            <Badge variant="secondary" className="cursor-pointer">
              Criminal Defense
            </Badge>
            <Badge variant="secondary" className="cursor-pointer">
              Most Reviewed
            </Badge>
          </div>
        </section>

        <section className="container mx-auto px-4 pb-12">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-black">
              Available Instantly
            </h2>
            <a href="#" className="text-sm text-black hover:underline">
              See all →
            </a>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {lawyers.map((lawyer, i) => (
              <Card key={i} className="overflow-hidden bg-white">
                <CardContent className="p-0">
                  <div className="aspect-square relative">
                    <img
                      src={lawyer.image}
                      alt={lawyer.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-black">{lawyer.name}</h3>
                    <p className="mb-4 text-sm text-gray-600">{lawyer.title}</p>
                    <div className="mb-4 flex items-center gap-2">
                      <img
                        src="https://via.placeholder.com/20"
                        alt={lawyer.company}
                        className="w-5 h-5 rounded"
                      />
                      <span className="text-sm text-gray-600">
                        {lawyer.company}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">
                          {lawyer.rating}
                        </span>
                      </div>
                      <Button size="sm" className="gap-2">
                        <Phone className="h-4 w-4" />
                        Call Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <span className="text-sm text-gray-600">
            © 2024 LegalConnect. All rights reserved.
          </span>
          <div className="flex gap-4">
            <a href="#" className="text-sm text-gray-600 hover:underline">
              Terms
            </a>
            <a href="#" className="text-sm text-gray-600 hover:underline">
              Privacy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
