package autoever2.cartag.service;

import autoever2.cartag.domain.car.CarDto;
import autoever2.cartag.domain.car.CarInfoDto;
import autoever2.cartag.repository.CarRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
        List<CarInfoDto> carInfos = repository.findCarByCarType(carType);
        if(carInfos.isEmpty()){
            throw new RuntimeException("미정");
        }

        return carInfos.stream()
                .map(carInfoDto -> CarDto.toDto(carInfoDto, repository.findDefaultOptionByCarId(carInfoDto.getCarId())))
                .collect(Collectors.toList());
    }



}
