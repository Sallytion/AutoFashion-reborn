import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function PopoverDemo({setCropBottom, setCropLeft, setCropRight, setCropTop}) {
  const handleSliderChange = (value, setter) => {
    setter(value);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Crop the Print</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Dimensions</h4>
            <p className="text-sm text-muted-foreground">
              Set the dimensions for the layer.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="cropTop">Crop Top</Label>
              <Slider
                id="cropTop"
                className="col-span-2 h-8"
                defaultValue={[10]}
                min={0.001}
                max={10}
                step={0.1}
                onValueChange={value => handleSliderChange(value, setCropTop)}
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="cropBottom">Crop bottom</Label>
              <Slider
                id="cropBottom"
                className="col-span-2 h-8"
                defaultValue={[10]}
                min={0.001}
                max={10}
                step={0.1}
                onValueChange={value => handleSliderChange(value, setCropBottom)}
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="cropRight">Crop right</Label>
              <Slider
                id="cropRight"
                className="col-span-2 h-8"
                defaultValue={[4]}
                min={0.001}
                max={4}
                step={0.1}
                onValueChange={value => handleSliderChange(value, setCropRight)}
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="cropLeft">Crop left</Label>
              <Slider
                id="cropLeft"
                className="col-span-2 h-8"
                defaultValue={[4]}
                min={0.001}
                max={4}
                step={0.1}
                onValueChange={value => handleSliderChange(value, setCropLeft)}
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}