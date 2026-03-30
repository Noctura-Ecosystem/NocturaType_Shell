#![no_std]
#![no_main]

use esp_backtrace as _;
use esp_hal::{clock::ClockControl, gpio::{Io, Output, PushPull}, peripherals::Peripherals, prelude::*, delay::Delay};

#[entry]
fn main() -> ! {
    let peripherals = Peripherals::take();
    let system = peripherals.SYSTEM.split();
    let clocks = ClockControl::boot_defaults(system.clock_control).freeze();
    let mut delay = Delay::new(&clocks);

    let io = Io::new(peripherals.GPIO, peripherals.IO_MUX);
    let mut heater = Output::new(io.pins.gpio4, PushPull);

    loop {
        heater.set_high();
        delay.delay_ms(10000u32);
        heater.set_low();
        delay.delay_ms(5000u32);
    }
}

// WINK:- this is not a part of this project!