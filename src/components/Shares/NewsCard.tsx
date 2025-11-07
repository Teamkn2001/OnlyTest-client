import React from 'react';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface NewsCardProps {
  image_url: string;
  title: string;
  published_date: string;
  category?: string;
}

const NewsCard: React.FC<NewsCardProps> = ({
  image_url,
  title,
  published_date,
  category = 'ข่าวหลัก',
}) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
      {/* Image Section */}
      <div className="relative w-full h-64 overflow-hidden ">
        <img
          src={image_url}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content Section */}
      <CardHeader className="space-y-3">
        {/* Category Badge */}
        <div className="inline-block">
          <span className="text-cyan-500 text-sm font-medium">{category}</span>
        </div>

        {/* Title */}
        <CardTitle className="text-2xl font-bold leading-tight hover:text-gray-700 transition-colors">
          {title}
        </CardTitle>
      </CardHeader>

      {/* Date Footer */}
      <CardFooter className="pt-0">
        <CardDescription className="text-sm text-gray-500">
          {published_date}
        </CardDescription>
      </CardFooter>
    </Card>
  );
};

export default NewsCard;