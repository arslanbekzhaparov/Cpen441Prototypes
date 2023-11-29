import 'package:flutter/material.dart';
import 'package:kalender/kalender.dart';
import 'package:flutter/services.dart';
import 'event.dart';

class MyCalendar extends StatefulWidget {
  @override
  _MyCalendarState createState() => _MyCalendarState();
}

class _MyCalendarState extends State<MyCalendar> {

  final CalendarEventsController<Event> eventsController = CalendarEventsController<Event>();
  final CalendarController<Event> calendarController = CalendarController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
            title: const Text('Input Availability')
        ),
        body: Stack(
            children: [
              CalendarView<Event>(
                eventsController: eventsController,
                controller: calendarController,
                viewConfiguration: WeekConfiguration(
                  timelineWidth: 56,
                  multiDayTileHeight: 24,
                  eventSnapping: false,
                  timeIndicatorSnapping: false,
                  createEvents: true,
                  createMultiDayEvents: true,
                  verticalStepDuration: const Duration(minutes: 15),
                  verticalSnapRange: const Duration(minutes: 15),
                  newEventDuration: const Duration(hours: 1),
                  horizontalStepDuration: const Duration(days: 1),
                  paintWeekNumber: true,
                  enableRescheduling: true,
                ),
                tileBuilder: _tileBuilder,
                multiDayTileBuilder: _multiDayTileBuilder,
                scheduleTileBuilder: _scheduleTileBuilder,
                eventHandlers: CalendarEventHandlers(
                  onEventTapped: onEventTapped,
                  onEventChanged: onEventChanged,
                  onCreateEvent: onCreateEvent,
                  onEventCreated: onEventCreated
                ),
              ),
              Visibility(
                visible: eventsController.selectedEvent != null,
                child: Positioned(
                  bottom: 16.0,
                  right: 16.0,
                  child: FloatingActionButton(
                    onPressed: () {
                      setState(() {
                        eventsController.removeEvent(
                            eventsController.selectedEvent as CalendarEvent<
                                Event>);
                        eventsController.deselectEvent();
                      });
                    },
                    child: const Icon(Icons.delete),
                  ),
                ),
              ),
            ]
        )
    );
  }

  CalendarEvent<Event> onCreateEvent(DateTimeRange dateTimeRange) {
    print("on create event");
    HapticFeedback.selectionClick();
    return createCalendarEvent(dateTimeRange);
  }

  Future<void> onEventCreated(CalendarEvent<Event> event) async {
    setState(() {
      eventsController.deselectEvent();
      eventsController.addEvent(event);
    });
  }

  Future<void> onEventTapped(CalendarEvent<Event> event) async {
    HapticFeedback.lightImpact();
    print("on event tapped");
    // Check if the event that was tapped is is currently selected.
    setState(() {
      eventsController.selectedEvent == event
      // If it is selected, deselect it.
          ? eventsController.deselectEvent()
      // If it is not selected, select it.
          : eventsController.selectEvent(
          event);
    });
  }

  Future<void> onEventChanged(DateTimeRange initialDateTimeRange,
      CalendarEvent<Event> event) async {
      setState(() {
        event.eventData?.timeRange = formatTimeRange(event.dateTimeRange);
        eventsController.deselectEvent();
      });

      print("on event changed");
      HapticFeedback.vibrate();
  }
}

Widget _tileBuilder(CalendarEvent<dynamic> event, TileConfiguration tileConfiguration) {
  final Event? customObject = event.eventData;

  return Card(
    color: customObject?.color,
    child: Text(customObject!.timeRange),
  );
}

Widget _multiDayTileBuilder(event, tileConfiguration) => const Card(
  color: Colors.red,
);

Widget _scheduleTileBuilder(event, date) => const Card(
  color: Colors.redAccent,
);

String formatTimeRange(DateTimeRange dateTimeRange) {
  return "${dateTimeRange.start.hour}:${dateTimeRange.start.minute} - "
      "${dateTimeRange.end.hour}:${dateTimeRange.end.minute}";
}

CalendarEvent<Event> createCalendarEvent(DateTimeRange dateTimeRange) {
  return CalendarEvent(
      dateTimeRange: dateTimeRange,
      modifiable: true,
      eventData: Event( // The custom object that you want to link to the event.
          color: Colors.greenAccent,
          timeRange: formatTimeRange(dateTimeRange)
      )
  );
}