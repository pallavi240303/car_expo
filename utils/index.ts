import { CarProps, FilterProps } from "@/types";

export async function fetchCars(filters: FilterProps){
    const {manufacturer,year,fuel,limit,model} =filters;
    const headers ={
		'X-RapidAPI-Key': '7ec015c4b0msh91117475f694776p1a252fjsn52dbad167246',
		'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
	}

    const response = await fetch(`https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`,{
        headers: headers,
    });

    const result = await response.json();
    return result;
}

export const calculateCarRent = (city_mpg: number,year: number)=> {
    const basePricePerDay = 70;
    const mileageFactor = 0.1;
    const ageFactor = 0.07;
    const mileageRate = city_mpg * mileageFactor;
    const ageRate = (new Date().getFullYear() - year) * ageFactor;
    const rentalPerDay = basePricePerDay +mileageRate + ageRate;
    return rentalPerDay.toFixed(0);
};

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
    const url = new URL("https://cdn.imagin.studio/getimage");
    const { make, model, year } = car;
  
    url.searchParams.append('customer', process.env.NEXT_PUBLIC_IMAGIN_API_KEY || '');
    url.searchParams.append('make', make);
    url.searchParams.append('modelFamily', model.split(" ")[0]);
    url.searchParams.append('zoomType', 'fullscreen');
    url.searchParams.append('modelYear', `${year}`);
    // url.searchParams.append('zoomLevel', zoomLevel);
    url.searchParams.append('angle', `${angle}`);
  
    return `${url}`;
  } 