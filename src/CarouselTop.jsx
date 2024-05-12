import * as React from "react"
import tshirticon from "../src/assets/tshirt.png"
import hoodieicon from "../src/assets/hoodie.png"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export function CarouselTop({setModelSelect}) {

  return (
    <Carousel className="w-full max-w-64">
      <CarouselContent>

          <CarouselItem key={0} onClick={() => setModelSelect(0)}> {/* Add onClick handler */}
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold"><img src={tshirticon}/></span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>

          <CarouselItem key={1} onClick={() => setModelSelect(1)}> {/* Add onClick handler */}
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold"><img src={hoodieicon} /></span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>

      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}