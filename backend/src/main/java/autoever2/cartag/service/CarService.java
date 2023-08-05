package autoever2.cartag.service;

import autoever2.cartag.domain.dto.car.CarDto;
import autoever2.cartag.domain.entity.car.Car;
import autoever2.cartag.repository.CarRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CarService {

    private final CarRepository repository;

    /**
     * Optional로 감싸진 값이 empty일 경우 어떤 예외 발생시킬지 정하기
     */
    public List<CarDto> findCarByCarType(int carType) {
        List<Car> cars = repository.findCarByCarType(carType).get();

        return cars.stream()
                .map(car -> CarDto.toDto(car, repository.findDefaultOptionByCarId(car.getCarId()).orElse(new ArrayList<>())))
                .collect(Collectors.toList());
    }



}
