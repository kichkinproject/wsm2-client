import { Component, AfterViewInit, OnDestroy } from "@angular/core";
import {Utils} from "../../utils/utils"
import { Processes } from "../../models/process";

export class EditorComponent implements AfterViewInit, OnDestroy {
  private $process: Processes;

  public get process() {
    return this.$process;
  }

  public set process(value: Processes) {
    if (Utils.exists(value)) {
      this.$process = value;
    }
  }

  public accessed() {
    return this.$process === Processes.CREATE || this.$process === Processes.EDIT;
  }

  public blocked() {
    return this.$process === Processes.LIST || this.$process === Processes.VIEW || this.$process === Processes.FIND;
  }

  public identificatorAcessed() {
    return this.$process === Processes.CREATE;
  }

  constructor() {
  }

  public ngAfterViewInit() {

  }

  public ngOnDestroy() {

  }
}
