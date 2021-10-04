import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { Missing } from 'src/app/_models/missing';
import { MissingsService } from 'src/app/_services/missings.service';

@Component({
  selector: 'app-missing-detail',
  templateUrl: './missing-detail.component.html',
  styleUrls: ['./missing-detail.component.css']
})
export class MissingDetailComponent implements OnInit {
  missing: Missing;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private missingService: MissingsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadMissing();
    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ]
  }

  getImages(): NgxGalleryImage[] {
    const imageUrls = [];
    for (const photo of this.missing.photos) {
      imageUrls.push({
        small: photo?.url,
        medium: photo?.url,
        big: photo?.url
      })
    }
    return imageUrls;
  }

  loadMissing() {
    this.missingService.getMissing(this.route.snapshot.paramMap.get('id')).subscribe(missing => {
      this.missing = missing;
      this.galleryImages = this.getImages();
    });
  }
}
